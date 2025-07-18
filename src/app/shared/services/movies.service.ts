import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieDetails } from '../models/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private readonly httpClient: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>("/movies");
  }

  getMovie(id: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`/movies/${id}`);
  }
}
