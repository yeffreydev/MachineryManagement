import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      firstName: 'Admin',
      lastName: 'Usuario',
      email: 'admin@example.com',
      role: 'admin',
      password: 'admin123'
    },
    {
      id: '2',
      firstName: 'Técnico',
      lastName: 'Especialista',
      email: 'tech@example.com',
      role: 'technician',
      password: 'tech123'
    },
    {
      id: '3',
      firstName: 'Cliente',
      lastName: 'Corporativo',
      email: 'client@example.com',
      role: 'client',
      password: 'client123'
    }
  ];

  private currentUser: User | null = null;

  login(email: string, password: string): Observable<{ success: boolean, user?: User, message?: string }> {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      return of({ success: true, user });
    } else {
      return of({ success: false, message: 'Credenciales inválidas' });
    }
  }

  logout(): Observable<boolean> {
    this.currentUser = null;
    return of(true);
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.currentUser);
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!this.currentUser);
  }

  getUserRole(): Observable<string | null> {
    return of(this.currentUser ? this.currentUser.role : null);
  }
}