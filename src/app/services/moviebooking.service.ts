import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviebookingService {

  constructor(public http: HttpClient) { }

  public apiUrl = 'http://api-book-movie-service.us-east-1.elasticbeanstalk.com/api/v1.0/moviebooking';
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  private options = { headers: this.headers };

  addMovie(movieName: string, theaterName: string, totalTickets: number): Observable<any> {
    const endpoint = `${this.apiUrl}/addmovie`;
    const requestBody = {
      movieName: movieName,
      theaterName: theaterName,
      totalTickets: totalTickets
    };
    return this.http.post(endpoint, requestBody, this.options);
  }

  updateMovieTickets(movieName: string, ticketCount: number): Observable<any> {
    const endpoint = `${this.apiUrl}/update/${movieName}/${ticketCount}`

    return this.http.put(endpoint, null, this.options);
  }

  fetchMovies(): Observable<any> {
    const endpoint = `${this.apiUrl}/getAllMovies`
    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      });

      return this.http.get(endpoint, {
        headers,
      });
    } else {
      return new Observable();
    }
  }

  bookMovie(movie: any): Observable<any> {
    if (movie.bookingCount > 0) {
      const requestBody = { numberOfTickets: movie.bookingCount };

      const endpoint = `${this.apiUrl}/book/${movie.movieName}`;
      return this.http.post(endpoint, requestBody, this.options);
    } else {
      return new Observable();
    }
  }

  deleteMovie(movieId: number): Observable<any> {
    const endpoint = `${this.apiUrl}/delete/${movieId}`;

    return this.http.delete(endpoint, this.options);
  }


  validateEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email });
  }
}
