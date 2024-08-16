import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Save data to localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get data from localStorage
  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Remove data from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all localStorage data
  clear(): void {
    localStorage.clear();
  }
}
