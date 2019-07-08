import { Injectable } from '@angular/core';
import {Movie, MovieDetail, toMovie, toMovieDetail, WikiResponse} from './model/movie';
import {Subject, from, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as fetchJsonp from 'fetch-jsonp';
import {MatSnackBar} from '@angular/material/snack-bar';
import {take} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static imdbApiRoot = 'https://sg.media-imdb.com/suggests';
  private static wikiApiRoot = 'https://en.wikipedia.org/api/rest_v1';

  constructor(private http: HttpClient) { }

  getMovieBySearchString(title: string): Subject<Movie[]> {
    const subject = new Subject<Movie[]>();
    try {
      if (title.trim()) {
        title = title.split(' ').join('_').toLowerCase();
        const fnName = `imdb$${title}`;
        from( fetchJsonp(`${MovieService.imdbApiRoot}/${title.charAt(0)}/${title}.json`, {
          jsonpCallbackFunction: fnName
        }))
          .subscribe(
            (value: Response) => {
              from(value.json()).
                pipe(
                  take(1)
              ).subscribe( (movieResponse: { d: [] }) => subject.next((movieResponse.d || []).map(e => toMovie(e))));
            }
          );
      } else {
        setTimeout(() => subject.next([]));
      }
    } catch (e) {}
    return subject;
  }

  getDetailFomWikiByTitle(title: string): Observable<WikiResponse> {

    return this.http.get<WikiResponse>(`${MovieService.wikiApiRoot}/page/summary/${title.split(' ').join('_')}`);
  }
}
