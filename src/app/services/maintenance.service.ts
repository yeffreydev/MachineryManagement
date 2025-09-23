import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Maintenance } from '../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private maintenanceList: Maintenance[] = [
    {
      id: '1',
      machineryId: '3',
      maintenanceType: 'preventive',
      date: new Date('2023-04-15'),
      technician: 'Carlos Rodríguez',
      description: 'Cambio de aceite y revisión general'
    },
    {
      id: '2',
      machineryId: '2',
      maintenanceType: 'corrective',
      date: new Date('2023-03-22'),
      technician: 'María González',
      description: 'Reparación del sistema hidráulico'
    },
    {
      id: '3',
      machineryId: '1',
      maintenanceType: 'preventive',
      date: new Date('2023-05-10'),
      technician: 'Juan Pérez',
      description: 'Inspección de componentes y lubricación'
    },
    {
      id: '4',
      machineryId: '3',
      maintenanceType: 'corrective',
      date: new Date('2023-01-15'),
      technician: 'Carlos Rodríguez',
      description: 'Reemplazo de filtro de aire y aceite'
    }
  ];

  getAllMaintenance(): Observable<Maintenance[]> {
    return of(this.maintenanceList);
  }

  getMaintenanceById(id: string): Observable<Maintenance | undefined> {
    const maintenance = this.maintenanceList.find(m => m.id === id);
    return of(maintenance);
  }

  getMaintenanceByMachineryId(machineryId: string): Observable<Maintenance[]> {
    const filteredMaintenance = this.maintenanceList.filter(m => m.machineryId === machineryId);
    return of(filteredMaintenance);
  }

  getMaintenanceByType(type: string): Observable<Maintenance[]> {
    const filteredMaintenance = this.maintenanceList.filter(m => m.maintenanceType === type);
    return of(filteredMaintenance);
  }

  addMaintenance(maintenance: Maintenance): Observable<boolean> {
    this.maintenanceList.push(maintenance);
    return of(true);
  }

  updateMaintenance(maintenance: Maintenance): Observable<boolean> {
    const index = this.maintenanceList.findIndex(m => m.id === maintenance.id);
    if (index !== -1) {
      this.maintenanceList[index] = maintenance;
      return of(true);
    }
    return of(false);
  }
}