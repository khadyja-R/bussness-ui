import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  private apiUrl = `http://localhost:8097/api`;


  
  constructor(private http: HttpClient) { }


  getAllTransactions() {
    return this.http.get(`${this.apiUrl}/transaction`);
  }

 

 
  
  

}
