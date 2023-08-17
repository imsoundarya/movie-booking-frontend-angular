import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movie-booking';
  isLoggedIn = true;

  // Okta key
  private OKTA_TOKEN_LOCAL_STORAGE_KEY = 'okta-token-storage';

  // expected algorithm for jwt token
  private EXPECTED_ALGORITHM = 'RS256';

  // Variables to hold token-related information
  private accessToken: string = '';
  private isTokenValid: boolean = false;
  private decodedEmail: string = '';


  navigateToUserBookings() {
  

    // Get the token storage from local storage
    const oktaTokenStorage = localStorage.getItem(this.OKTA_TOKEN_LOCAL_STORAGE_KEY);
    if (oktaTokenStorage) {
      // Parse the token storage object
      const parsedOktaToken = JSON.parse(oktaTokenStorage);

      if (parsedOktaToken && parsedOktaToken.idToken && typeof parsedOktaToken.idToken === 'object') {
        // Extract the idToken object
        const idTokenObject = parsedOktaToken.idToken;

        if (idTokenObject.idToken && typeof idTokenObject.idToken === 'string') {
          // Extract the access token from the idToken object
          this.accessToken = idTokenObject.idToken;

          if (this.accessToken) {
            // Decode the access token header and payload
            const tokenHeader = this.accessToken.split('.')[0];
            const decodedHeader = JSON.parse(atob(tokenHeader));

            const tokenPayload = this.accessToken.split('.')[1];
            const decodedPayload = JSON.parse(atob(tokenPayload));

            // Get the current timestamp
            const currentTimestamp = Math.floor(Date.now() / 1000);

            // Extract expiration timestamp and algorithm from decoded payload and header
            const expiryTimestamp = decodedPayload.exp;
            const actualAlgorithm = decodedHeader.alg;

            // Check if token is expired and if algorithm is valid
            const isExpired = expiryTimestamp < currentTimestamp;
            const isAlgorithmValid = actualAlgorithm === this.EXPECTED_ALGORITHM;

            // Determine if the token is valid
            this.isTokenValid = !isExpired && isAlgorithmValid;

            if (this.isTokenValid) {
              // If token is valid, extract the decoded email
              this.decodedEmail = decodedPayload.preferred_username;
              console.log('Token is valid and decoded Email is :', this.decodedEmail);
              
              this.apiService.validateEmail(this.decodedEmail).subscribe(
                
                (response) => {
                  console.log('Backend API Response:', response);
                },
                (error) => {
                  console.error('Error calling backend API:', error);
                }
              );
            } else {
              console.log('Token is not valid.');
            }
          }
        }
      }
    }
  }
}
