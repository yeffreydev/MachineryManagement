import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password, fullname } = this.registerForm.value;
      this.authService.register({ fullname: fullname, email, password, role: "USER" }).subscribe({
        next: (response) => {
          this.successMessage = 'Usuario registrado exitosamente. Redirigiendo al login...';
          this.errorMessage = '';
          console.log('Registration successful:', response);
          // Force change detection
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.error?.message || error.error || 'Error al registrar usuario';
          this.successMessage = '';
        }
      });
    }
  }
}
