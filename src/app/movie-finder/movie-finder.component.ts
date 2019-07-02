import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {ImdbFilmTypes, Movie} from '../model/movie';

@Component({
  selector: 'app-movie-finder',
  templateUrl: './movie-finder.component.html',
  styleUrls: ['./movie-finder.component.scss']
})
export class MovieFinderComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  inRelatedMoviesMode = false;
  originalMovieResult: Movie[];

  constructor() { }

  ngOnInit() {
  }

  refresMovies(movies: Movie[]) {
    this.selectedMovie = null;
    this.inRelatedMoviesMode = false;

    this.originalMovieResult = movies;
    this.movies = this.originalMovieResult;
  }

  onlyMovies(checked: boolean) {
    if (checked) {
      this.movies = this.originalMovieResult.filter( movie => {
        return Object.values(ImdbFilmTypes).find(e => e === movie.q);
        }
      );
    } else {
      this.movies = this.originalMovieResult;
    }
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  showRelatedMovies(isShowRelatedMovies: boolean) {
    if (isShowRelatedMovies) {
      this.inRelatedMoviesMode = true;
      this.movies = this.selectedMovie.related;
    } else {
      this.inRelatedMoviesMode = false;
      this.movies = this.originalMovieResult;
    }
  }
}
