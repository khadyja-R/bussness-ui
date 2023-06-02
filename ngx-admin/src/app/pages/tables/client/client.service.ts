import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private API_URL = `http://localhost:8097/api/v1`;

  constructor(private http: HttpClient) { }
  getAllClients() {
    return this.http.get(`${this.API_URL}/clients`);
  }
  
  DeleteClient(id: number) {
    return this.http.delete(`${this.API_URL}/clients/${id}`);
  }
  
  updateClient(id: number, data: any) {
    return this.http.put(`${this.API_URL}/clients/${id}`, data);
  }

  getClientbyId(id: number) : Observable<any>{
      return this.http.get(`${this.API_URL}/clients/${id}`);
    }
  }
  
