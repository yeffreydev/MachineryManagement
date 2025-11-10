import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Machinery } from '../../../models/machinery.model';

@Component({
  selector: 'app-machinery-card',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './machinery-card.component.html',
  styleUrls: ['./machinery-card.component.css']
})
export class MachineryCardComponent {
  @Input() machinery!: Machinery;

  constructor(library: FaIconLibrary) {
    library.addIcons(faMapMarkerAlt);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'disponible':
        return 'bg-green-100 text-green-800';
      case 'alquilada':
        return 'bg-blue-100 text-blue-800';
      case 'mantenimiento':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'disponible':
        return 'Disponible';
      case 'alquilada':
        return 'Alquilada';
      case 'mantenimiento':
        return 'Mantenimiento';
      default:
        return status;
    }
  }

  getImageUrl(): string {
    if (this.machinery.imagen) {
      return `http://localhost:8080${this.machinery.imagen}`;
    }
    return '/images/default-machinery.jpg'; // fallback image
  }
}