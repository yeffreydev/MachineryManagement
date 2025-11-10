import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rental } from '../../models/rental.model';
import { Machinery } from '../../models/machinery.model';
import { RentalService } from '../../services/rental.service';
import { MachineryService } from '../../services/machinery.service';

@Component({
  selector: 'app-rental-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {
  rentalForm: FormGroup;
  isEditMode = false;
  rentalId: string | null = null;
  machineryList: Machinery[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private rentalService: RentalService,
    private machineryService: MachineryService
  ) {
    this.rentalForm = this.fb.group({
      machineryId: ['', Validators.required],
      clientName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['pending', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadMachinery();
    this.rentalId = this.route.snapshot.paramMap.get('id');
    if (this.rentalId) {
      this.isEditMode = true;
      this.loadRental(this.rentalId);
    }
  }

  loadMachinery(): void {
    this.machineryService.getAllMachinery().subscribe(machinery => {
      this.machineryList = machinery;
    });
  }

  loadRental(id: string): void {
    this.rentalService.getRentalById(id).subscribe(rental => {
      if (rental) {
        this.rentalForm.patchValue({
          machineryId: rental.machineryId,
          clientName: rental.clientName,
          startDate: rental.startDate.toISOString().split('T')[0],
          endDate: rental.endDate.toISOString().split('T')[0],
          status: rental.status,
          cost: rental.cost
        });
      }
    });
  }

  onSubmit(): void {
    if (this.rentalForm.valid) {
      const formData = this.rentalForm.value;
      const rental: Rental = {
        id: this.rentalId || Math.random().toString(36).substring(2, 9),
        machineryId: formData.machineryId,
        clientName: formData.clientName,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        status: formData.status,
        cost: formData.cost
      };

      if (this.isEditMode) {
        this.rentalService.updateRental(rental).subscribe(() => {
          this.router.navigate(['/rental']);
        });
      } else {
        this.rentalService.addRental(rental).subscribe(() => {
          this.router.navigate(['/rental']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/rental']);
  }
}