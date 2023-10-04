import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }
  login(data: any) {
    return this.http.post<any>('http://192.168.8.157:3000/auth/login', data)
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    const _to = JSON.stringify(token);
    localStorage.setItem('token', _to);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Check if the token exists (not expired).
  }

  logout(): void {
    localStorage.removeItem('token');
  }



}
