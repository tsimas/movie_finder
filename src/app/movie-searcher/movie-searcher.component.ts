import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Movie} from '../model/movie';
import {MovieService} from '../movie.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-movie-searcher',
  templateUrl: './movie-searcher.component.html',
  styleUrls: ['./movie-searcher.component.scss']
})
export class MovieSearcherComponent implements OnInit {
  @Output() moviesChanged = new EventEmitter<Movie[]>();
  @Output() onlyMoviesChanged = new EventEmitter<boolean>();
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  onlyMovies(checked: boolean) {
    this.onlyMoviesChanged.emit(checked);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.getMovieBySearchString(term)),
    ).subscribe( (movies: Movie[]) => {
      this.moviesChanged.emit(movies);
    });
  }

}
