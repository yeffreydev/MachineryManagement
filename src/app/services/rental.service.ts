import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Rental } from '../models/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private rentalList: Rental[] = [
    {
      id: '1',
      machineryId: '2',
      clientId: '1',
      clientName: 'Constructora ABC',
      startDate: new Date('2023-05-15'),
      endDate: new Date('2023-06-15'),
      status: 'active',
      cost: 15000
    },
    {
      id: '2',
      machineryId: '6',
      clientId: '2',
      clientName: 'Obras Generales S.A.',
      startDate: new Date('2023-04-10'),
      endDate: new Date('2023-05-10'),
      status: 'completed',
      cost: 8000
    },
    {
      id: '3',
      machineryId: '3',
      clientId: '3',
      clientName: 'Inmobiliaria XYZ',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-07-01'),
      status: 'pending',
      cost: 12000
    }
  ];

  getAllRentals(): Observable<Rental[]> {
    return of(this.rentalList);
  }

  getRentalById(id: string): Observable<Rental | undefined> {
    const rental = this.rentalList.find(r => r.id === id);
    return of(rental);
  }

  getRentalsByStatus(status: string): Observable<Rental[]> {
    const filteredRentals = this.rentalList.filter(r => r.status === status);
    return of(filteredRentals);
  }

  getRentalsByMachineryId(machineryId: string): Observable<Rental[]> {
    const filteredRentals = this.rentalList.filter(r => r.machineryId === machineryId);
    return of(filteredRentals);
  }

  addRental(rental: Rental): Observable<boolean> {
    this.rentalList.push(rental);
    return of(true);
  }

  updateRental(rental: Rental): Observable<boolean> {
    const index = this.rentalList.findIndex(r => r.id === rental.id);
    if (index !== -1) {
      this.rentalList[index] = rental;
      return of(true);
    }
    return of(false);
  }

  deleteRental(id: string): Observable<boolean> {
    const index = this.rentalList.findIndex(r => r.id === id);
    if (index !== -1) {
      this.rentalList.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}