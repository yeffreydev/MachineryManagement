import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { Rental } from '../../models/rental.model';
import { RentalService } from '../../services/rental.service';
import { RentalTableComponent } from '../../shared/components/rental-table/rental-table.component';
import { DeleteConfirmationModalComponent } from '../../shared/components/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-rental-list',
  imports: [RouterLink, FormsModule, CommonModule, RentalTableComponent, DeleteConfirmationModalComponent, FontAwesomeModule],
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];
  filteredRentals: Rental[] = [];
  statusFilter: string = 'all';

  // Modal properties
  showDeleteModal: boolean = false;
  rentalToDelete: Rental | null = null;

  constructor(private rentalService: RentalService, private router: Router, library: FaIconLibrary) {
    library.addIcons(faPlus, faFileContract);
  }

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

  onEditRental(rental: Rental): void {
    this.router.navigate(['/rental/edit', rental.id]);
  }

  onDeleteRental(rental: Rental): void {
    this.rentalToDelete = rental;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.rentalToDelete) {
      this.rentalService.deleteRental(this.rentalToDelete.id).subscribe({
        next: () => {
          // Remove from local arrays instead of reloading to avoid infinite change detection
          this.rentals = this.rentals.filter(r => r.id !== this.rentalToDelete!.id);
          this.applyFilters();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting rental:', error);
          // Still close the modal even if there's an error
          this.closeDeleteModal();
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.rentalToDelete = null;
  }
}