import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machinery } from '../models/machinery.model';

@Injectable({
  providedIn: 'root'
})
export class MachineryService {
  private apiUrl = 'http://localhost:8080/api/maquinas';

  constructor(private http: HttpClient) {}

  getAllMachinery(): Observable<Machinery[]> {
    return this.http.get<Machinery[]>(this.apiUrl);
  }

  getMachineryById(id: string): Observable<Machinery> {
    return this.http.get<Machinery>(`${this.apiUrl}/${id}`);
  }

  getMachineryByStatus(status: string): Observable<Machinery[]> {
    return this.http.get<Machinery[]>(`${this.apiUrl}?estado=${status}`);
  }

  searchMachinery(query: string): Observable<Machinery[]> {
    return this.http.get<Machinery[]>(`${this.apiUrl}?search=${query}`);
  }

  addMachinery(machinery: Machinery): Observable<Machinery> {
    return this.http.post<Machinery>(this.apiUrl, machinery);
  }

  updateMachinery(id: string, machinery: Machinery): Observable<Machinery> {
    return this.http.put<Machinery>(`${this.apiUrl}/${id}`, machinery);
  }

  deleteMachinery(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/api/images/upload', formData);
  }
}