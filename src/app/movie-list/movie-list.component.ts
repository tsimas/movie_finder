import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() inRelatedMoviesMode: boolean;
  @Input() movies: Movie[];
  @Output() movieSelected = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit() {
  }

  selectMovie(movie: Movie) {
    this.movieSelected.emit(movie);
  }
}
