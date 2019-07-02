import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-movie-finder',
  templateUrl: './movie-finder.component.html',
  styleUrls: ['./movie-finder.component.scss']
})
export class MovieFinderComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  inRelatedMoviesMode = false;

  private moviesTmp: Movie[];
  constructor() { }

  ngOnInit() {
  }

  refresMovies(movies: Movie[]) {
    this.selectedMovie = null;
    this.inRelatedMoviesMode = false;

    this.movies = movies;
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  showRelatedMovies(isShowRelatedMovies: boolean) {
    if (isShowRelatedMovies) {
      this.moviesTmp = this.movies;
      this.inRelatedMoviesMode = true;
      this.movies = this.selectedMovie.related;
    } else {
      this.inRelatedMoviesMode = false;
      this.movies = this.moviesTmp;
    }
  }
}
