import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { Machinery } from '../../models/machinery.model';
import { Maintenance } from '../../models/maintenance.model';
import { MachineryService } from '../../services/machinery.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { DeleteConfirmationModalComponent } from '../../shared/components/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-machinery-detail',
  imports: [RouterLink, DatePipe, CommonModule, DeleteConfirmationModalComponent],
  templateUrl: './machinery-detail.component.html',
  styleUrls: ['./machinery-detail.component.css']
})
export class MachineryDetailComponent implements OnInit {
  machinery: Machinery | undefined;
  maintenances: Maintenance[] = [];
  showDeleteModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private machineryService: MachineryService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    const machineryId = this.route.snapshot.paramMap.get('id');
    if (machineryId) {
      this.loadMachinery(machineryId);
      this.loadMaintenances(machineryId);
    }
  }

  loadMachinery(id: string): void {
    this.machineryService.getMachineryById(id).subscribe(machinery => {
      this.machinery = machinery;
    });
  }

  loadMaintenances(machineryId: string): void {
    this.maintenanceService.getMaintenanceByMachineryId(machineryId).subscribe(maintenances => {
      this.maintenances = maintenances;
    });
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

  getMaintenanceTypeText(type: string): string {
    switch (type) {
      case 'preventive':
        return 'Preventivo';
      case 'corrective':
        return 'Correctivo';
      default:
        return type;
    }
  }

  onDelete(): void {
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.machinery) {
      this.machineryService.deleteMachinery(this.machinery.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.router.navigate(['/machinery']);
        },
        error: (error) => {
          console.error('Error deleting machinery:', error);
          this.showDeleteModal = false;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }
}