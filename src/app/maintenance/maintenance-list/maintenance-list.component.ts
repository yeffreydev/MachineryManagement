import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Maintenance } from '../../models/maintenance.model';
import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceTableComponent } from '../../shared/components/maintenance-table/maintenance-table.component';

@Component({
  selector: 'app-maintenance-list',
  imports: [RouterLink, FormsModule, CommonModule, MaintenanceTableComponent],
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  maintenances: Maintenance[] = [];
  filteredMaintenances: Maintenance[] = [];
  typeFilter: string = 'all';

  constructor(private maintenanceService: MaintenanceService) {}

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
}