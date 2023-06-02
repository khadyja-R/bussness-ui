import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffilatorService {

  constructor() { }

  private fullName: string;

  setFullName(fullName: string): void {
    this.fullName = fullName;
  }

  getFullName(): string {
    return this.fullName;
  }
  
}
