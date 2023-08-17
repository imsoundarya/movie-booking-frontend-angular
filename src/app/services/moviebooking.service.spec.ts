import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviebookingService } from './moviebooking.service';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

fdescribe('MoviebookingService', () => {
  let service: MoviebookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviebookingService]
    });
    service = TestBed.inject(MoviebookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a movie', () => {
    const movieName = 'Movie 1';
    const theaterName = 'Theater 1';
    const totalTickets = 10;
    const response = { success: true };

    service.addMovie(movieName, theaterName, totalTickets).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/addmovie`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ movieName, theaterName, totalTickets });
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    req.flush(response);
  });

  it('should update movie tickets', () => {
    const movieName = 'Movie 1';
    const ticketCount = 5;
    const response = { success: true };

    service.updateMovieTickets(movieName, ticketCount).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/update/${movieName}/${ticketCount}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    req.flush(response);
  });

  it('should fetch movies when token is available', () => {
    const moviesResponse = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

    localStorage.setItem('token', 'testToken');

    spyOn(service.http, 'get').and.returnValue(of(moviesResponse));

    service.fetchMovies().subscribe((movies) => {
      expect(movies).toEqual(moviesResponse);
      expect(service.http.get).toHaveBeenCalledWith(`${service.apiUrl}/getAllMovies`, {
        headers: jasmine.any(HttpHeaders)
      });
    });
  });



  it('should return an empty observable when token is not available', () => {
    localStorage.removeItem('token');

    spyOn(service.http, 'get').and.returnValue(of());

    service.fetchMovies().subscribe((movies) => {
      expect(movies).toBeFalsy();
    });
  });




  it('should book a movie when bookingCount is greater than 0', () => {
    const movie = { movieName: 'Movie 1', bookingCount: 2 };
    const response = { success: true };

    service.bookMovie(movie).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/book/${movie.movieName}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    expect(req.request.body).toEqual({ numberOfTickets: movie.bookingCount });
    req.flush(response);
  });

  it('should return an empty observable when bookingCount is not greater than 0', () => {
    const movie = { bookingCount: 0 };

    service.bookMovie(movie).subscribe({
      next: () => fail('Expected empty observable'),
      complete: () => expect(true).toBe(true),
    });
  });

  it('should delete a movie', () => {
    const movieId = 1;
    const response = { success: true };

    service.deleteMovie(movieId).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/delete/${movieId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    req.flush(response);
  });


});
