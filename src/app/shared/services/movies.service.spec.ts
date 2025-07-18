import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieDetails } from '../models/movie-details.model';
import { Movie } from '../models/movie.model';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of movies', () => {
    const mockMovies: Movie[] = [
      {
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
      }
    ];

    service.getMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should return movie details', () => {
    const mockMovie: MovieDetails =
    {
      "id": "e80d5a37-620e-4be2-92b9-fb1f5262494f",
      "title": "Harry Potter and the Philosopher's Stone",
      "duration": "152",
      "budget": "125",
      "release_date": "2001-11-04",
      "box_office": "1.018",
      "cinematographers": ["John Seale"],
      "poster": "https://www.wizardingworld.com/images/products/films/rectangle-1.png",
      "producers": ["Chris Columbus", "David Heyman", "Mark Radcliffe"],
      "summary": "Harry Potter’s dull life is completely changed on his eleventh birthday when a mysterious letter addressed to him arrives in the mail. After finding out about his real parents and a whole hidden wizarding world, he goes on to Hogwarts, his new magical school. From battling a troll to flying on broomsticks to catch golden snitches, Harry’s new life promises to be full of joy and adventure, until he finds out about a certain Dark Lord who murdered his parents is trying to regain power. With his friends Hermione and Ron, Harry sets out to find the philosopher’s stone before Voldemort to prevent his return. After advancing through a particularly difficult set of traps designed by the school, Harry faces the Dark Lord and manages to keep the Philosopher’s Stone safe."
    }
      ;

    service.getMovie("e80d5a37-620e-4be2-92b9-fb1f5262494f").subscribe((result) => {
      expect(result).toEqual(mockMovie);
    });

    const req = httpMock.expectOne('/movies/e80d5a37-620e-4be2-92b9-fb1f5262494f');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });
});
