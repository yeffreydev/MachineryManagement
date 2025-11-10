import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Rental } from '../models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:8080/api/alquileres';

  constructor(private http: HttpClient) {}

  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.apiUrl);
  }

  getRentalById(id: string): Observable<Rental> {
    return this.http.get<Rental>(`${this.apiUrl}/${id}`);
  }

  getRentalsByStatus(status: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/status/${status}`);
  }

  getRentalsByMachineryId(machineryId: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.apiUrl}/maquina/${machineryId}`);
  }

  addRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(this.apiUrl, rental);
  }

  updateRental(rental: Rental): Observable<Rental> {
    return this.http.put<Rental>(`${this.apiUrl}/${rental.id}`, rental);
  }

  deleteRental(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}