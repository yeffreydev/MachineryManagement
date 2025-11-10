import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MachineryService } from '../services/machinery.service';
import { Machinery } from '../models/machinery.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  maquinarias: Machinery[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private machineryService: MachineryService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/machinery']);
      } else {
        this.loadMachinery();
      }
    });
  }

  loadMachinery() {
    this.machineryService.getMachineryByStatus('disponible').subscribe(machinery => {
      this.maquinarias = machinery;
    });
  }

  verInventarioCompleto() {
    this.router.navigate(['/auth/login']);
  }

  scrollToFeatures(): void {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  irADetalle() {
    this.router.navigate(['/auth/login']);
  }

  cotizar() {
    const whatsappUrl = 'https://wa.me/51923291773?text=Hola,%20me%20gustaría%20cotizar%20una%20maquinaria';
    window.open(whatsappUrl, '_blank');
  }
}