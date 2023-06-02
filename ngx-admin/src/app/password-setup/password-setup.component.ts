import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-setup',
  templateUrl: './password-setup.component.html',
  styleUrls: ['./password-setup.component.scss']
})
export class PasswordSetupComponent implements OnInit {
  token: string;
  password: string;
  confirmPassword: string;
  successMessage: string;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  submitForm(){
    if (!this.password || !this.confirmPassword) {
      return;
    }
  
    const url = 'http://localhost:8097/api/set-password';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams()
      .set('token', this.token)
      .set('password', this.password)
      .set('confirmPassword', this.confirmPassword);
  
    this.http.post(url, params.toString(), { headers, observe: 'response' }).subscribe(
      (response) => {
        if (response.status === 200) {
          this.successMessage = 'Password set successfully';
          this.errorMessage = null;
        } else {
          this.successMessage = null;
          this.errorMessage = 'Error setting password. Status: ' + response.status + ', ' + response.statusText;
        }
      },
      (error) => {
        console.error('Error:', error); // Log the error object to the console
        this.successMessage = null;
        this.errorMessage = 'Error setting password. Please check the console for more details.';
      }
    );
  }
  
}
