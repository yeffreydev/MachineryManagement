import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // TODO: Decode token to get user info or make a request to get current user
      // For now, we'll assume the user is authenticated if token exists
      this.currentUserSubject.next({ email: '', password: '', role: 'USER', fullname: 'Usuario' }); // Placeholder
    }
  }

  register(data: { fullname: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          // TODO: Decode token to get user info
          this.currentUserSubject.next({ email, password: '', role: '', fullname: '' }); // Placeholder
        }
      }),
      catchError(error => {
        return of({ success: false, message: error.error || 'Login failed' });
      })
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    return of(true);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    return of(!!token);
  }

  getUserRole(): Observable<string | null> {
    // TODO: Extract role from JWT token
    return of('USER'); // Placeholder
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
}