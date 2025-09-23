import { Component, Input } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Rental } from '../../../models/rental.model';

@Component({
  selector: 'app-rental-table',
  imports: [DatePipe, CommonModule],
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.css']
})
export class RentalTableComponent {
  @Input() rentals: Rental[] = [];

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'completed':
        return 'Completada';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  }
}