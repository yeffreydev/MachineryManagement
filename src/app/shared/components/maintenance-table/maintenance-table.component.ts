import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Maintenance } from '../../../models/maintenance.model';

@Component({
  selector: 'app-maintenance-table',
  imports: [DatePipe, CommonModule, FontAwesomeModule],
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.css']
})
export class MaintenanceTableComponent {
  @Input() maintenances: Maintenance[] = [];
  @Output() editMaintenance = new EventEmitter<Maintenance>();
  @Output() deleteMaintenance = new EventEmitter<Maintenance>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faEdit, faTrash);
  }

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

  onEditMaintenance(maintenance: Maintenance): void {
    this.editMaintenance.emit(maintenance);
  }

  onDeleteMaintenance(maintenance: Maintenance): void {
    this.deleteMaintenance.emit(maintenance);
  }
}