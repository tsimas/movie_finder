import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieFinderComponent} from './movie-finder/movie-finder.component';

const routes: Routes = [
  {path: 'movie-finder', component: MovieFinderComponent},
  { path: '', redirectTo: '/movie-finder', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
