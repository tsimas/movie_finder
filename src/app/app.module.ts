import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieFinderComponent } from './movie-finder/movie-finder.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieSearcherComponent } from './movie-searcher/movie-searcher.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { UsedMaterialModule } from './usedMaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { SpecialCharacterDirective } from './special-character.directive';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarHorizontalPosition} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MovieFinderComponent,
    MovieDetailComponent,
    MovieListComponent,
    MovieSearcherComponent,
    SpecialCharacterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    UsedMaterialModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [ {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
    duration: 2500,
      horizontalPosition: 'right'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
