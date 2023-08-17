import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      // Redirect to the login page or any other page
      this.router.navigate(['/login']);
      return false; // Block access to the route
    }
  }
}
