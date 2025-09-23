import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import { Maintenance } from '../../models/maintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceTableComponent } from '../../shared/components/maintenance-table/maintenance-table.component';
import { DeleteConfirmationModalComponent } from '../../shared/components/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-maintenance-list',
  imports: [RouterLink, FormsModule, CommonModule, MaintenanceTableComponent, DeleteConfirmationModalComponent, FontAwesomeModule],
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  maintenances: Maintenance[] = [];
  filteredMaintenances: Maintenance[] = [];
  typeFilter: string = 'all';

  // Modal properties
  showDeleteModal: boolean = false;
  maintenanceToDelete: Maintenance | null = null;

  constructor(private maintenanceService: MaintenanceService, private router: Router, library: FaIconLibrary) {
    library.addIcons(faPlus, faTools);
  }

  ngOnInit(): void {
    this.loadMaintenances();
  }

  loadMaintenances(): void {
    this.maintenanceService.getAllMaintenance().subscribe(maintenances => {
      this.maintenances = maintenances;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    if (this.typeFilter === 'all') {
      this.filteredMaintenances = [...this.maintenances];
    } else {
      this.filteredMaintenances = this.maintenances.filter(m => m.maintenanceType === this.typeFilter);
    }
  }

  onTypeChange(): void {
    this.applyFilters();
  }

  getTypeOptions(): { value: string, label: string }[] {
    return [
      { value: 'all', label: 'Todos' },
      { value: 'preventive', label: 'Preventivo' },
      { value: 'corrective', label: 'Correctivo' }
    ];
  }

  onEditMaintenance(maintenance: Maintenance): void {
    this.router.navigate(['/maintenance/edit', maintenance.id]);
  }

  onDeleteMaintenance(maintenance: Maintenance): void {
    this.maintenanceToDelete = maintenance;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.maintenanceToDelete) {
      this.maintenanceService.deleteMaintenance(this.maintenanceToDelete.id).subscribe({
        next: () => {
          // Remove from local arrays instead of reloading to avoid infinite change detection
          this.maintenances = this.maintenances.filter(m => m.id !== this.maintenanceToDelete!.id);
          this.applyFilters();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting maintenance:', error);
          // Still close the modal even if there's an error
          this.closeDeleteModal();
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.maintenanceToDelete = null;
  }
}