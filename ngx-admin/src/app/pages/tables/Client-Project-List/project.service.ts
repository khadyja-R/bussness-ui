import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `http://localhost:8097/api`;

 
  constructor(private http: HttpClient) { }
  getAllProjects() {
    return this.http.get(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects/${id}`);
  }

  getProjectByClientId(clientId: string): Observable<any> {
    const url = `${this.apiUrl}/projects/${clientId}`;
    return this.http.get<any>(url);
  }
  
  

}
