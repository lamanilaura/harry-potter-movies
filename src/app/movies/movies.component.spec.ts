import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MoviesService } from '../shared/services/movies.service';
import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieServiceMock: jasmine.SpyObj<MoviesService>;
  const movies = [{
    "id": "e80d5a37-620e-4be2-92b9-fb1f5262494f",
    "title": "Harry Potter and the Philosopher's Stone",
    "duration": "152",
    "budget": "125",
    "release_date": "2001-11-04"
  }, {
    "id": "1e04ad42-c21f-40d3-9a7e-0a521980c192",
    "title": "Harry Potter and the Chamber of Secrets",
    "duration": "161",
    "budget": "125",
    "release_date": "2002-11-15"
  }];

  beforeEach(async () => {
    movieServiceMock = jasmine.createSpyObj('MoviesService', ['getMovies']);
    movieServiceMock.getMovies.and.returnValue(of(movies));

    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [{ provide: MoviesService, useValue: movieServiceMock }, provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with movies from the service', () => {
    expect(component.movies.length).toBe(2);
    expect(component.filteredMovies.length).toBe(2);
  });

  it('should filter movies by title correctly', () => {
    const filter = { title: 'Chamber of Secrets', releaseYear: null };
    component.filterMovies(filter);

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Harry Potter and the Chamber of Secrets');
  });

  it('should filter movies by release year correctly', () => {
    const filter = { title: '', releaseYear: 200 };
    component.filterMovies(filter);

    expect(component.filteredMovies.length).toBe(2);
  });

  it('should filter movies by title and release year correctly', () => {
    const filter = { title: 'Harry', releaseYear: 2001 };
    component.filterMovies(filter);

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Harry Potter and the Philosopher\'s Stone');
  });
});
