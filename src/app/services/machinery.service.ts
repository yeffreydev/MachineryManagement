import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Machinery } from '../models/machinery.model';

@Injectable({
  providedIn: 'root'
})
export class MachineryService {
  private machineryList: Machinery[] = [
    {
      id: '1',
      name: 'Excavadora Hidráulica',
      type: 'Excavadora',
      model: 'CAT 320D',
      status: 'available',
      location: 'Almacén Central',
      specifications: {
        power: '120 HP',
        capacity: '1.2 m³',
        weight: '21,000 kg',
        dimensions: '9.5m x 3m x 3.2m'
      },
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      name: 'Tractor de Oruga',
      type: 'Tractor',
      model: 'John Deere 7R',
      status: 'rented',
      location: 'Sitio Norte',
      specifications: {
        power: '200 HP',
        capacity: 'N/A',
        weight: '15,000 kg',
        dimensions: '5.2m x 2.8m x 3.1m'
      },
      imageUrl: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      name: 'Retroexcavadora',
      type: 'Excavadora',
      model: 'JCB 3CX',
      status: 'maintenance',
      location: 'Taller Mecánico',
      specifications: {
        power: '75 HP',
        capacity: '0.7 m³',
        weight: '8,000 kg',
        dimensions: '6.8m x 2.4m x 2.8m'
      },
      imageUrl: 'https://images.unsplash.com/photo-1605729715874-43eff9b8d8c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '4',
      name: 'Minicargadora',
      type: 'Cargadora',
      model: 'Bobcat S70',
      status: 'available',
      location: 'Almacén Central',
      specifications: {
        power: '50 HP',
        capacity: '0.8 m³',
        weight: '3,200 kg',
        dimensions: '3.5m x 1.8m x 2.1m'
      },
      imageUrl: 'https://images.unsplash.com/photo-1595353540865-64f8ef1d007b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '5',
      name: 'Montacargas Telescópico',
      type: 'Montacargas',
      model: 'Genie Z60',
      status: 'available',
      location: 'Almacén Norte',
      specifications: {
        power: '30 HP',
        capacity: '250 kg',
        weight: '5,800 kg',
        dimensions: '8.5m x 2.3m x 2.5m'
      },
      imageUrl: 'https://images.unsplash.com/photo-1605256680140-96d3b0b0a0c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '6',
      name: 'Compactador de Suelos',
      type: 'Compactador',
      model: 'Wacker Neuson',
      status: 'rented',
      location: 'Sitio Sur',
      specifications: {
        power: '25 HP',
        capacity: 'N/A',
        weight: '1,500 kg',
        dimensions: '2.2m x 1.2m x 1.3m'
      },
      imageUrl: 'https://images.unsplash.com/photo-1605256680140-96d3b0b0a0c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];

  getAllMachinery(): Observable<Machinery[]> {
    return of(this.machineryList);
  }

  getMachineryById(id: string): Observable<Machinery | undefined> {
    const machinery = this.machineryList.find(m => m.id === id);
    return of(machinery);
  }

  getMachineryByStatus(status: string): Observable<Machinery[]> {
    const filteredMachinery = this.machineryList.filter(m => m.status === status);
    return of(filteredMachinery);
  }

  searchMachinery(query: string): Observable<Machinery[]> {
    const filteredMachinery = this.machineryList.filter(m => 
      m.name.toLowerCase().includes(query.toLowerCase()) || 
      m.type.toLowerCase().includes(query.toLowerCase()) ||
      m.model.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredMachinery);
  }

  addMachinery(machinery: Machinery): Observable<boolean> {
    this.machineryList.push(machinery);
    return of(true);
  }

  updateMachinery(machinery: Machinery): Observable<boolean> {
    const index = this.machineryList.findIndex(m => m.id === machinery.id);
    if (index !== -1) {
      this.machineryList[index] = machinery;
      return of(true);
    }
    return of(false);
  }
}