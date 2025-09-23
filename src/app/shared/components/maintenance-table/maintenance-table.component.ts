import { Component, Input } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Maintenance } from '../../../models/maintenance.model';

@Component({
  selector: 'app-maintenance-table',
  imports: [DatePipe, CommonModule],
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.css']
})
export class MaintenanceTableComponent {
  @Input() maintenances: Maintenance[] = [];

  getMaintenanceTypeClass(type: string): string {
    switch (type) {
      case 'preventive':
        return 'bg-green-100 text-green-800';
      case 'corrective':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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