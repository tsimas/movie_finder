import { Component, OnInit } from '@angular/core';
import {ImdbFilmTypes, Movie} from '../model/movie';

@Component({
  selector: 'app-movie-finder-page',
  templateUrl: './movie-finder-page.component.html',
  styleUrls: ['./movie-finder.-pagecomponent.scss']
})
export class MovieFinderPageComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  inRelatedMoviesMode = false;
  inOnlyMovieMode = false;
  originalMovieResult: Movie[];

  constructor() { }

  ngOnInit() {
  }

  refreshMovies(movies: Movie[]) {
    this.selectedMovie = null;
    this.inRelatedMoviesMode = false;
    this.originalMovieResult = movies;
    this.reloadCalculateMovies();
  }

  onlyMovies(checked: boolean) {
    this.inOnlyMovieMode = checked;
    this.reloadCalculateMovies();
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  showRelatedMovies(isShowRelatedMovies: boolean) {
    this.inRelatedMoviesMode = isShowRelatedMovies;
    this.reloadCalculateMovies();
  }

  private filterMovies(movies: Movie[]): Movie[] {
    return movies.filter( movie => {
        return Object.values(ImdbFilmTypes).find(e => e === movie.q);
      }
    );
  }

  private reloadCalculateMovies() {
    let movies = this.inRelatedMoviesMode ? this.selectedMovie.related : this.originalMovieResult;
    movies = this.inOnlyMovieMode ? this.filterMovies(movies) : movies;
    this.movies = movies;
  }
}
