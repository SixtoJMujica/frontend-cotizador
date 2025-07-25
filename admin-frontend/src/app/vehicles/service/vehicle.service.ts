import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Vehicle {
  id?: number;
  marca: string;
  modelo: string;
  anio: number;
  usageType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly API_URL = `${environment.apiUrl}/vehicle`;


  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.API_URL);
  }

  getById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.API_URL}/${id}`);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.API_URL, vehicle);
  }

  update(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.API_URL}/${id}`, vehicle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
