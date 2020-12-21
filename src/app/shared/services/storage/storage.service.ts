import { Injectable } from '@angular/core';
import { IStorageService } from '@cms/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorageService {

  constructor() { }

  has(key: string): boolean {
    return !!this.get(key);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
