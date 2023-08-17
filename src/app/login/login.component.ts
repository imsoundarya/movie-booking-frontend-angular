import { Component } from '@angular/core';
import { UserModal } from '../modal/user-modal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LoginResponseModal } from '../modal/login-response-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }
  user: UserModal = new UserModal();

  onLogin() {
    this.http
      .post('http://api-auth-service.us-east-1.elasticbeanstalk.com/api/v1.0/auth/login', this.user)
      .subscribe(
        (data: any) => {
          const loginResponseData: LoginResponseModal = data;
          localStorage.setItem('token', loginResponseData.accessToken);
          localStorage.setItem('role', loginResponseData.role);
          localStorage.setItem('username', loginResponseData.username);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log('please enter valid credentials');
          this.loginError = true;
          this.errorMessage = 'Wrong credentials. Please try again.';
        }
      );
  }

  clearErrorMessage() {
    this.loginError = false;
    this.errorMessage = '';
  }
}
