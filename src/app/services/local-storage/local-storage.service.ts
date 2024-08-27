import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem<T>(key: string, item: T): void {
    const jsonString = JSON.stringify(item);
    localStorage.setItem(key, jsonString);
  }

  getItem<T>(key: string): T | null {
    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) as T : null;
  }

}
