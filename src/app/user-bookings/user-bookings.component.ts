import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = [];
  userRole = localStorage.getItem('role');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Call the API to get the user's booked movie details
    this.getUserBookings();
  }

  getUserBookings(): void {
    if (this.userRole === 'admin') {
      const url = `http://api-book-movie-service.us-east-1.elasticbeanstalk.com/api/v1.0/moviebooking/getAllTickets`;
      const token = localStorage.getItem('token');

      // Set the authorization header if required
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>(url, { headers }).subscribe(
        response => {
          this.bookings = response;
        },
        error => {
          console.error('Error retrieving user bookings:', error);
        }
      );
    } else {
      const userId = localStorage.getItem('username');
      const url = `http://api-book-movie-service.us-east-1.elasticbeanstalk.com/api/v1.0/moviebooking/getUserTickets/${userId}`;
      const token = localStorage.getItem('token');

      // Set the authorization header if required
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any[]>(url, { headers }).subscribe(
        response => {
          this.bookings = response;
        },
        error => {
          console.error('Error retrieving user bookings:', error);
        }
      );
    }
  }
}
