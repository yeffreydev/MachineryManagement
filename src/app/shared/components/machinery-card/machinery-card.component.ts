import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Machinery } from '../../../models/machinery.model';

@Component({
  selector: 'app-machinery-card',
  imports: [CommonModule],
  templateUrl: './machinery-card.component.html',
  styleUrls: ['./machinery-card.component.css']
})
export class MachineryCardComponent {
  @Input() machinery!: Machinery;

  getStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'rented':
        return 'Alquilada';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return status;
    }
  }
}