import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPipe } from '@angular/common';
import { provideRouter, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieDetails } from '../shared/models/movie-details.model';
import { DurationPipe } from '../shared/pipes/duration.pipe';
import { MoneyAmountPipe } from '../shared/pipes/money-amount.pipe';
import { MoviesService } from '../shared/services/movies.service';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieServiceMock: jasmine.SpyObj<MoviesService>;


  beforeEach(async () => {
    movieServiceMock = jasmine.createSpyObj('MoviesService', ['getMovie']);

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, AsyncPipe, RouterLink, DurationPipe, MoneyAmountPipe],
      providers: [
        provideRouter([]),
        { provide: MoviesService, useValue: movieServiceMock }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovie on initialisation', () => {
    const mockMovie: MovieDetails = {
      "id": "e80d5a37-620e-4be2-92b9-fb1f5262494f",
      "title": "Harry Potter and the Philosopher's Stone",
      "duration": "152",
      "budget": "125",
      "release_date": "2001-11-04",
      "box_office": "1.018",
      "cinematographers": ["John Seale"],
      "poster": "https://www.wizardingworld.com/images/products/films/rectangle-1.png",
      "producers": ["Chris Columbus", "David Heyman", "Mark Radcliffe"],
      "summary": "Harry Potter’s life is dull."
    };

    component.id = '1234';
    const mockMovie$: Observable<MovieDetails> = of(mockMovie);
    movieServiceMock.getMovie.and.returnValue(mockMovie$);

    component.ngOnInit();

    expect(movieServiceMock.getMovie).toHaveBeenCalledWith('1234');
    expect(component.movie$).toEqual(mockMovie$);
  });
});
