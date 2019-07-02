import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieFinderPageComponent} from './movie-finder-page/movie-finder-page.component';

const routes: Routes = [
  {path: 'movie-finder', component: MovieFinderPageComponent},
  { path: '', redirectTo: '/movie-finder', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
