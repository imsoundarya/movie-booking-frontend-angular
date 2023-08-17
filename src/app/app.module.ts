import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { RegistrationSuccessDialogComponent } from './material-dailogs/registration-success-dialog/registration-success-dialog.component';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AuthGuard } from './services/auth-guard-service';
import { LoginComponent } from './login/login.component';
import { AdminScreenComponent } from './admin-screen/admin-screen.component';
import { DeleteSuccessDialogComponent } from './material-dailogs/delete-success-dialog/delete-success-dialog.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { ErrorDialogComponent } from './material-dailogs/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    RegistrationSuccessDialogComponent,
    AdminScreenComponent,
    DeleteSuccessDialogComponent,
    UserBookingsComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
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
    MatOptionModule,
  ],
  providers: [AuthGuard, HomepageComponent],
  bootstrap: [AppComponent],
  entryComponents: [RegistrationSuccessDialogComponent],
})
export class AppModule { }
