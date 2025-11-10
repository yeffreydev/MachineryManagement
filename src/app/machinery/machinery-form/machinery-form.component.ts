import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isEditMode: boolean = false;
  machineryId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private machineryService: MachineryService
  ) {
    this.machineryForm = this.fb.group({
      codigo: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['disponible', Validators.required],
      ubicacion: ['', Validators.required],
      tarifaHora: [0, [Validators.required, Validators.min(0)]],
      potencia: [''],
      capacidad: [''],
      peso: [''],
      dimensiones: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.machineryId = params.get('id');
      if (this.machineryId) {
        this.isEditMode = true;
        this.loadMachinery(this.machineryId);
      }
    });
  }

  loadMachinery(id: string): void {
    this.machineryService.getMachineryById(id).subscribe(machinery => {
      this.machineryForm.patchValue({
        codigo: machinery.codigo,
        modelo: machinery.modelo,
        tipo: machinery.tipo,
        estado: machinery.estado,
        ubicacion: machinery.ubicacion,
        tarifaHora: machinery.tarifaHora,
        potencia: machinery.potencia,
        capacidad: machinery.capacidad,
        peso: machinery.peso,
        dimensiones: machinery.dimensiones
      });
      if (machinery.imagen) {
        this.imagePreview = 'http://localhost:8080' + machinery.imagen;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.machineryForm.valid) {
      const formData = this.machineryForm.value;
      const machinery: Machinery = {
        id: this.machineryId || '',
        codigo: formData.codigo,
        modelo: formData.modelo,
        tipo: formData.tipo,
        estado: formData.estado,
        ubicacion: formData.ubicacion,
        tarifaHora: formData.tarifaHora,
        potencia: formData.potencia,
        capacidad: formData.capacidad,
        peso: formData.peso,
        dimensiones: formData.dimensiones
      };

      if (this.selectedFile) {
        // First upload the image
        this.machineryService.uploadImage(this.selectedFile).subscribe({
          next: (imageResponse) => {
            machinery.imagen = imageResponse.url;
            // Then create or update the machinery with the image URL
            this.saveMachinery(machinery);
          },
          error: (error) => {
            console.error('Error uploading image:', error);
          }
        });
      } else {
        // If no new image selected, keep the existing image (only for edit mode)
        if (this.isEditMode && this.imagePreview) {
          machinery.imagen = this.imagePreview;
        }
        // Create or update machinery without changing the image
        this.saveMachinery(machinery);
      }
    }
  }

  private saveMachinery(machinery: Machinery): void {
    if (this.isEditMode && this.machineryId) {
      this.machineryService.updateMachinery(this.machineryId, machinery).subscribe({
        next: () => {
          this.router.navigate(['/machinery']);
        },
        error: (error) => {
          console.error('Error updating machinery:', error);
        }
      });
    } else {
      this.machineryService.addMachinery(machinery).subscribe({
        next: () => {
          this.router.navigate(['/machinery']);
        },
        error: (error) => {
          console.error('Error creating machinery:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/machinery']);
  }
}