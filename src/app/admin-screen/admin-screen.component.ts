import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MoviebookingService } from '../services/moviebooking.service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent {
  movieName!: string;
  theaterName!: string;
  message!: string;
  addTicketCount!: number;

  updateMovieName!: string;
  updateTicketCount!: number;
  updateTicketMessage!: string;

  constructor(private http: HttpClient,
    private movieService: MoviebookingService) { }

  addMovie(): void {
    this.movieService.addMovie(this.movieName, this.theaterName, this.addTicketCount).subscribe(
      (data) => {
        this.message = 'Movie added successfully';
        this.movieName = '';
        this.theaterName = '';
        this.addTicketCount = null as any;
      },
      (error) => {
        console.log('Error occurred while adding movie:', error);
        this.message = 'Ooops!! Something went wrong. Please check input fields or contact support.';
        this.movieName = '';
        this.theaterName = '';
        this.addTicketCount = null as any;
      }
    );
  }

  closeMessage() {
    this.movieName = '';
    this.theaterName = '';
    this.message = '';
    this.updateTicketMessage = '';
  }


  updateMovieTickets() {
    this.movieService.updateMovieTickets(this.updateMovieName, this.updateTicketCount).subscribe(
      (data) => {
        this.updateTicketMessage = `Tickets updated successfully for ${this.updateMovieName}.`;
        this.updateMovieName = '';
        this.updateTicketCount = null as any;
      },
      (error) => {
        console.log('Error occurred while updating tickets:', error);
        this.updateTicketMessage = 'Ooops!! Something went wrong. Please check input fields or contact support.';
        this.updateMovieName = '';
        this.updateTicketCount = null as any;
      }
    );
  }
}
