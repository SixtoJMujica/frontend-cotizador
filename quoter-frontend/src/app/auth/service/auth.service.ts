
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import {
  LoginCredentials,
  LoginResponse,
  UserTokenPayload,
} from '../model/auth.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserFromToken(): UserTokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    try {
      const decoded = atob(payload);
      return JSON.parse(decoded) as UserTokenPayload;
    } catch (e) {
      return null;
    }
  }

  logout(): void {
    this.http
      .post(
        `${this.API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      )
      .subscribe({
        next: () => {
          this.clearSession();
        },
        error: () => {
          this.clearSession();
        },
      });
  }

  private clearSession(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getUserFromToken();
    return user?.role === 'admin';
  }

  getUserRole(): string | null {
    return this.getUserFromToken()?.role ?? null;
  }
}
