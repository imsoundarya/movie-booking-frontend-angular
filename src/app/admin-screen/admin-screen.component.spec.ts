import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AdminScreenComponent } from './admin-screen.component';
import { MoviebookingService } from '../services/moviebooking.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

fdescribe('AdminScreenComponent', () => {
  let component: AdminScreenComponent;
  let fixture: ComponentFixture<AdminScreenComponent>;
  let movieService: MoviebookingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,],
      declarations: [AdminScreenComponent],
      providers: [MoviebookingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScreenComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MoviebookingService);
    fixture.detectChanges();
  });

  it('should add a movie successfully', () => {
    const addMovieSpy = spyOn(movieService, 'addMovie').and.returnValue(of({}));

    component.movieName = 'Movie 1';
    component.theaterName = 'Theater 1';
    component.addTicketCount = 5;
    component.addMovie();

    expect(addMovieSpy).toHaveBeenCalledWith('Movie 1', 'Theater 1', 5);
    expect(component.message).toBe('Movie added successfully');
    expect(component.movieName).toBe('');
    expect(component.theaterName).toBe('');
    expect(component.addTicketCount).toBeNull();
  });

  it('should handle error while adding movie', () => {
    const errorMessage = 'Error message';
    spyOn(movieService, 'addMovie').and.returnValue(
      throwError({ message: errorMessage })
    );

    component.addMovie();

    expect(component.message).toBe(
      'Ooops!! Something went wrong. Please check input fields or contact support.'
    );
    expect(component.movieName).toBe('');
    expect(component.theaterName).toBe('');
    expect(component.addTicketCount).toBeNull();
  });

  it('should update movie tickets successfully', () => {
    const updateMovieTicketsSpy = spyOn(
      movieService,
      'updateMovieTickets'
    ).and.returnValue(of({}));

    component.updateMovieName = 'Movie 1';
    component.updateTicketCount = 10;
    component.updateMovieTickets();

    expect(updateMovieTicketsSpy).toHaveBeenCalledWith('Movie 1', 10);
    expect(component.updateTicketMessage).toBe(
      'Tickets updated successfully for Movie 1.'
    );
    expect(component.updateMovieName).toBe('');
    expect(component.updateTicketCount).toBeNull();
  });

  it('should handle error while updating movie tickets', () => {
    const errorMessage = 'Error message';
    spyOn(movieService, 'updateMovieTickets').and.returnValue(
      throwError({ message: errorMessage })
    );

    component.updateMovieTickets();

    expect(component.updateTicketMessage).toBe(
      'Ooops!! Something went wrong. Please check input fields or contact support.'
    );
    expect(component.updateMovieName).toBe('');
    expect(component.updateTicketCount).toBeNull();
  });
});
