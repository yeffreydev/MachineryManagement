import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Machinery } from '../../models/machinery.model';
import { MachineryService } from '../../services/machinery.service';

@Component({
  selector: 'app-machinery-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './machinery-form.component.html',
  styleUrls: ['./machinery-form.component.css']
})
export class MachineryFormComponent implements OnInit {
  machineryForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private machineryService: MachineryService
  ) {
    this.machineryForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      model: ['', Validators.required],
      status: ['available', Validators.required],
      location: ['', Validators.required],
      power: ['', Validators.required],
      capacity: ['', Validators.required],
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.machineryForm.valid) {
      const formData = this.machineryForm.value;
      const machinery: Machinery = {
        id: Math.random().toString(36).substring(2, 9),
        name: formData.name,
        type: formData.type,
        model: formData.model,
        status: formData.status,
        location: formData.location,
        specifications: {
          power: formData.power,
          capacity: formData.capacity,
          weight: formData.weight,
          dimensions: formData.dimensions
        },
        imageUrl: formData.imageUrl
      };

      this.machineryService.addMachinery(machinery).subscribe(() => {
        this.router.navigate(['/machinery']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/machinery']);
  }
}