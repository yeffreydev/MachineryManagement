import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Rental } from '../../../models/rental.model';

@Component({
  selector: 'app-rental-table',
  imports: [DatePipe, CommonModule, FontAwesomeModule],
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.css']
})
export class RentalTableComponent {
  @Input() rentals: Rental[] = [];
  @Output() editRental = new EventEmitter<Rental>();
  @Output() deleteRental = new EventEmitter<Rental>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faEdit, faTrash);
  }

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

  onEditRental(rental: Rental): void {
    this.editRental.emit(rental);
  }

  onDeleteRental(rental: Rental): void {
    this.deleteRental.emit(rental);
  }
}