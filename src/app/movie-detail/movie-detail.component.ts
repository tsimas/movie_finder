import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Movie, MovieDetail, toMovieDetail, WikiResponse} from '../model/movie';
import {MovieService} from '../movie.service';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Observable, Observer, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Output() showRelatedMoviesChanged = new EventEmitter<boolean>();
  @Input() movie: Movie;
  movieDetail: MovieDetail;

  movieDetailChange = new Subject<string>();
  allSubscription =  new Subscription();

  constructor(private movieService: MovieService,
              private snackBar: MatSnackBar) { }

  ngOnChanges(changes: any) {
    if (changes.movie.currentValue) {
      this.movieDetailChange.next(this.movie.title);
    }
  }

  ngOnInit() {
    this.allSubscription.add(this.movieDetailChange.subscribe(
      (title) => {
        this.allSubscription.add(this.movieService.getDetailFomWikiByTitle(title)
            .subscribe((response) => {
              this.movieDetail = toMovieDetail(response);
              this.movieDetail.imdbUrl += this.movie.id.startsWith('tt') ? `title/${this.movie.id}` : `name/${this.movie.id}`;
              this.movieDetail.related = this.movie.related;
            }, () => {
              this.snackBar.open(`Not found Wiki page for string: ${this.movie.title}`);
              this.movieDetail = new MovieDetail();
              this.movieDetail.imdbUrl += this.movie.id.startsWith('tt') ? `title/${this.movie.id}` : `name/${this.movie.id}`;
              this.movieDetail.related = this.movie.related;
              this.movieDetail.title = this.movie.title;
            }));
      }));
  }

  onRelatedChange(isChecked: boolean) {
    this.showRelatedMoviesChanged.emit(isChecked);
  }

  ngOnDestroy(): void {
    this.allSubscription.unsubscribe();
  }
}
