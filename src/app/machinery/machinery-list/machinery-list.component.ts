import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Machinery } from '../../models/machinery.model';
import { MachineryService } from '../../services/machinery.service';
import { MachineryCardComponent } from '../../shared/components/machinery-card/machinery-card.component';

@Component({
  selector: 'app-machinery-list',
  imports: [RouterLink, FormsModule, CommonModule, MachineryCardComponent, FontAwesomeModule],
  templateUrl: './machinery-list.component.html',
  styleUrls: ['./machinery-list.component.css']
})
export class MachineryListComponent implements OnInit {
  machineryList: Machinery[] = [];
  filteredMachinery: Machinery[] = [];
  searchQuery: string = '';
  statusFilter: string = 'all';

  constructor(private machineryService: MachineryService, library: FaIconLibrary) {
    library.addIcons(faPlus, faSearch);
  }

  ngOnInit(): void {
    this.loadMachinery();
  }

  loadMachinery(): void {
    this.machineryService.getAllMachinery().subscribe(machinery => {
      this.machineryList = machinery;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = this.machineryList;

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(m =>
        m.modelo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        m.tipo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        m.codigo.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(m => m.estado === this.statusFilter);
    }

    this.filteredMachinery = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  getStatusOptions(): { value: string, label: string }[] {
    return [
      { value: 'all', label: 'Todos' },
      { value: 'disponible', label: 'Disponible' },
      { value: 'alquilada', label: 'Alquilada' },
      { value: 'mantenimiento', label: 'Mantenimiento' }
    ];
  }
}