import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Movie, MovieDetail, toMovieDetail} from '../model/movie';
import {MovieService} from '../movie.service';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnChanges {
  @Output() showRelatedMoviesChanged = new EventEmitter<boolean>();
  @Input() movie: Movie;
  movieDetail: MovieDetail;

  constructor(private movieService: MovieService,
              private snackBar: MatSnackBar) { }

  ngOnChanges(changes: any) {
    if (changes.movie.currentValue) {
      this.movieService.getDetailFomWikiByTitle(this.movie.title)
        .subscribe((response) => {
          this.movieDetail = toMovieDetail(response);
          this.movieDetail.imdbUrl += this.movie.id.startsWith('tt') ? `title/${this.movie.id}` : `name/${this.movie.id}`;
          this.movieDetail.related = this.movie.related;
        }, error => {
          this.snackBar.open(`Not found Wiki page for string: ${this.movie.title}`);
          this.movieDetail = null;
        });
    }
  }

  ngOnInit() {
  }

  onRelatedChange(isChecked: boolean) {
    this.showRelatedMoviesChanged.emit(isChecked);
  }
}
