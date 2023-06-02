import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  error: string;
  passwordVisible: boolean = false;


  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }
  
  login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          const email = this.authService.getLoggedInEmail();
          if (email) {
            this.authService.emailLoggedIn.emit(email);
            this.router.navigate(['/pages/profile', email]);
          }
        },
        (error) => {
          console.log('Login error', error);
          if (error.error && error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'An error occurred during login.';
          }
        }
      );
  }
  
}
