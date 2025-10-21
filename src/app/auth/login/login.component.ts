import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string = '';
  isRegistering: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.router.navigate(['/machinery']);
          } else {
            this.errorMessage = response.message || 'Error de autenticación';
          }
        },
        error: (error) => {
          this.errorMessage = error.error || 'Error de autenticación';
        }
      });
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;
      
      if (password !== confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      this.authService.register({ fullname:name, email, password }).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.router.navigate(['/machinery']);
          } else {
            this.errorMessage = response.message || 'Error al crear la cuenta';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al crear la cuenta';
        }
      });
    }
  }
}