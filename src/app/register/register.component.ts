import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserModal } from '../modal/user-modal';
import { RegistrationSuccessDialogComponent } from '../material-dailogs/registration-success-dialog/registration-success-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../material-dailogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  user: UserModal = new UserModal();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  register(): void {
    this.http
      .post('http://api-auth-service.us-east-1.elasticbeanstalk.com/api/v1.0/auth/signup', this.user)
      .subscribe(
        (response) => {
          this.openRegistrationSuccessDialog();
        },
        (error) => {
          console.error('Registration failed');
          console.error(error);
          this.openErrorDialogbox(error.error);
        }
      );
  }

  openRegistrationSuccessDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      panelClass: 'registration-success-dialog',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  openErrorDialogbox(error: any): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      panelClass: 'error-dialog',
      width: '300px',
      data: { error },
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
