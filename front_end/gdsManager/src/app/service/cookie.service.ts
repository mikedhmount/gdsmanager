import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookies: string = '';

  setCookies(cookies: string) {
    this.cookies = cookies;
    localStorage.setItem('authCookies', cookies); // Store persistently
  }

  getCookies(): string {
    return this.cookies || localStorage.getItem('authCookies') || '';
  }
}
