import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HomepageComponent],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule, MatDialogModule, NoopAnimationsModule],
      providers: [HomepageComponent, MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'movie-booking'`, () => {
    expect(component.title).toEqual('movie-booking');
  });

  // it('should navigate to /login on logout', () => {
  //   const routerSpy = spyOn(component.router, 'navigate');
  //   component.logout();
  //   expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  //   expect(routerSpy).toHaveBeenCalledWith(['/login']);
  // });

  it('should navigate to /home on title click', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.onTitleClick();
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /user-bookings', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    component.navigateToUserBookings();
    expect(routerSpy).toHaveBeenCalledWith(['/user-bookings']);
  });
});
