import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Maintenance } from '../../models/maintenance.model';
import { Machinery } from '../../models/machinery.model';
import { MaintenanceService } from '../../services/maintenance.service';
import { MachineryService } from '../../services/machinery.service';

@Component({
  selector: 'app-maintenance-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {
  maintenanceForm: FormGroup;
  isEditMode = false;
  maintenanceId: string | null = null;
  machineryList: Machinery[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private machineryService: MachineryService
  ) {
    this.maintenanceForm = this.fb.group({
      machineryId: ['', Validators.required],
      maintenanceType: ['preventive', Validators.required],
      date: ['', Validators.required],
      technician: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMachinery();
    this.maintenanceId = this.route.snapshot.paramMap.get('id');
    if (this.maintenanceId) {
      this.isEditMode = true;
      this.loadMaintenance(this.maintenanceId);
    }
  }

  loadMachinery(): void {
    this.machineryService.getAllMachinery().subscribe(machinery => {
      this.machineryList = machinery;
    });
  }

  loadMaintenance(id: string): void {
    this.maintenanceService.getMaintenanceById(id).subscribe(maintenance => {
      if (maintenance) {
        this.maintenanceForm.patchValue({
          machineryId: maintenance.machineryId,
          maintenanceType: maintenance.maintenanceType,
          date: maintenance.date.toISOString().split('T')[0],
          technician: maintenance.technician,
          description: maintenance.description
        });
      }
    });
  }

  onSubmit(): void {
    if (this.maintenanceForm.valid) {
      const formData = this.maintenanceForm.value;
      const maintenance: Maintenance = {
        id: this.maintenanceId || Math.random().toString(36).substring(2, 9),
        machineryId: formData.machineryId,
        maintenanceType: formData.maintenanceType,
        date: new Date(formData.date),
        technician: formData.technician,
        description: formData.description
      };

      if (this.isEditMode) {
        this.maintenanceService.updateMaintenance(maintenance).subscribe(() => {
          this.router.navigate(['/maintenance']);
        });
      } else {
        this.maintenanceService.addMaintenance(maintenance).subscribe(() => {
          this.router.navigate(['/maintenance']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/maintenance']);
  }
}