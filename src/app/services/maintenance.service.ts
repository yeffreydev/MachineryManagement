import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Maintenance } from '../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:8080/api/mantenimientos';

  constructor(private http: HttpClient) {}

  getAllMaintenance(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.apiUrl).pipe(
      map((maintenances: any[]) => maintenances.map(m => ({
        ...m,
        fecha: new Date(m.fecha)
      })))
    );
  }

  getMaintenanceById(id: string): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.apiUrl}/${id}`);
  }

  getMaintenanceByMachineryId(machineryId: string): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/maquina/${machineryId}`);
  }

  getMaintenanceByType(type: string): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/tipo/${type}`);
  }

  addMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(this.apiUrl, maintenance);
  }

  updateMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${this.apiUrl}/${maintenance.id}`, maintenance);
  }

  deleteMaintenance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}