import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rental } from '../../models/rental.model';
import { RentalService } from '../../services/rental.service';
import { RentalTableComponent } from '../../shared/components/rental-table/rental-table.component';

@Component({
  selector: 'app-rental-list',
  imports: [RouterLink, FormsModule, CommonModule, RentalTableComponent],
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];
  filteredRentals: Rental[] = [];
  statusFilter: string = 'all';

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe(rentals => {
      this.rentals = rentals;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    if (this.statusFilter === 'all') {
      this.filteredRentals = [...this.rentals];
    } else {
      this.filteredRentals = this.rentals.filter(r => r.status === this.statusFilter);
    }
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  getStatusOptions(): { value: string, label: string }[] {
    return [
      { value: 'all', label: 'Todos' },
      { value: 'active', label: 'Activa' },
      { value: 'completed', label: 'Completada' },
      { value: 'pending', label: 'Pendiente' }
    ];
  }
}