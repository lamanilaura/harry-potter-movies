import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
import { DurationPipe } from '../shared/pipes/duration.pipe';
import { MoneyAmountPipe } from '../shared/pipes/money-amount.pipe';
import { MoviesService } from '../shared/services/movies.service';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AsyncPipe, DurationPipe, MoneyAmountPipe, FiltersComponent, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly moviesService: MoviesService) {

  }

  ngOnInit(): void {
    this.moviesService.getMovies().pipe(takeUntil(this.unsubscribe$)).subscribe(result => { this.movies = result; this.filteredMovies = this.movies });
  }

  filterMovies(filter: { title: string, releaseYear: number | null }): void {
    this.filteredMovies = this.movies.filter(movie => {
      const titleMatches = filter.title ? movie.title.toLowerCase().includes(filter.title.toLowerCase()) : true;
      const yearMatches = filter.releaseYear ? movie.release_date.substring(0, 4).includes(filter.releaseYear.toString()) : true;
      return titleMatches && yearMatches;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
