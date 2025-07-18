import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: '**', component: NotFoundComponent }
];
