import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  emailLoggedIn: EventEmitter<string> = new EventEmitter<string>();

  private apiUrl = `http://localhost:8097/api/affilators`;
  private localStorageTokenKey = 'token'; // Key for the token in localStorage
  private localStorageEmailKey = 'email'; // Key for the email in localStorage

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<any>(`${this.apiUrl}/login`, null, { params })
      .pipe(
        tap((response) => {
          // Save the token and email in localStorage
          localStorage.setItem(this.localStorageTokenKey, response.token);
          localStorage.setItem(this.localStorageEmailKey, email);
          this.router.navigate(['/pages/profile', email]);
        })
      );
  }

  logout(): void {
    console.log('I am handling the logout');
    localStorage.removeItem(this.localStorageTokenKey);
    localStorage.removeItem(this.localStorageEmailKey);
    this.router.navigate(['/auth/login']);
  }

  getLoggedInEmail(): string {
    return localStorage.getItem(this.localStorageEmailKey);
  }
}
