import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../shared/services/movies.service';
import { MovieDetails } from '../shared/models/movie-details.model';
import { RouterLink } from '@angular/router';
import { DurationPipe } from '../shared/pipes/duration.pipe';
import { MoneyAmountPipe } from '../shared/pipes/money-amount.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink, DurationPipe, MoneyAmountPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie$?: Observable<MovieDetails>;

  @Input()
  id!: string;

  constructor(private readonly movieService: MoviesService) { }

  ngOnInit(): void {
    this.movie$ = this.movieService.getMovie(this.id);
  }
}
