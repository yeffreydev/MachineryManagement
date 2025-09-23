import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { Machinery } from '../../models/machinery.model';
import { Maintenance } from '../../models/maintenance.model';
import { MachineryService } from '../../services/machinery.service';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-machinery-detail',
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './machinery-detail.component.html',
  styleUrls: ['./machinery-detail.component.css']
})
export class MachineryDetailComponent implements OnInit {
  machinery: Machinery | undefined;
  maintenances: Maintenance[] = [];

  constructor(
    private route: ActivatedRoute,
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
}