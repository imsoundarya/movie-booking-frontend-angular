import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultModal } from '../modal/search-result-modal';
import { DeleteSuccessDialogComponent } from '../material-dailogs/delete-success-dialog/delete-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MoviebookingService } from '../services/moviebooking.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  movies: any[] = [];
  userRole = localStorage.getItem('role');
  isInputValid: boolean = false;


  searchQuery: string = '';
  searchResults: any[] = [];
  // isSearchPerformed: boolean = false;

  constructor(private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private movieService: MoviebookingService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  onSearchChange() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = this.movies;
    }
  }


  fetchMovies(): void {
    this.movieService.fetchMovies().subscribe(
      (data: any) => {
        this.movies = data;
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  bookMovie(movie: any): void {
    this.movieService.bookMovie(movie).subscribe(
      (data: any) => {
        movie.successMessage = `Booking confirmed for ${movie.bookingCount} tickets.`;
        movie.showInputField = false;
        movie.showSuccessMessage = true;
        window.location.reload();
      },
      (error) => {
        console.log('Error occurred while booking:', error);
      }
    );
  }

  openBookingDialog(movie: any): void {
    movie.showInputField = true;
    movie.showSuccessMessage = false;
  }

  goToAdminScreen() {
    this.router.navigate(['/admin']);
  }

  searchMovie() {
    this.searchResults = [];
    // Perform the search based on the movie name
    if (this.searchQuery.trim() !== '') {
      this.searchResults = this.movies.filter(movie =>
        movie.movieName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If search query is empty, show all movies
      this.searchResults = this.movies;
    }
  }

  deleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(
      (data: any) => {
        this.openDeletionSuccessDialogbox();
      },
      (error) => {
        console.log('Error occurred while deleting movie:', error);
      }
    );
  }

  openDeletionSuccessDialogbox(): void {
    const dialogRef = this.dialog.open(DeleteSuccessDialogComponent, {
      panelClass: 'registration-success-dialog',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  validateInput(movie: any): void {
    this.isInputValid = !isNaN(movie.bookingCount) && movie.bookingCount >= 1 &&
      movie.bookingCount <= 10 && movie.bookingCount <= movie.totalTickets;
  }

}
