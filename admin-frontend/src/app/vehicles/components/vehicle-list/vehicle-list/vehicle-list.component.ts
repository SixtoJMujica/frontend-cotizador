import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleService } from './../../../service/vehicle.service';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  showForm = false;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
    console.log('[VehicleListComponent] Cargando módulo de vehículos');
  }

  loadVehicles() {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error al cargar vehículos', err),
    });
  }

  onCreate() {
    this.selectedVehicle = null;
    this.showForm = true;
  }

  onEdit(vehicle: Vehicle) {
    this.selectedVehicle = { ...vehicle };
    this.showForm = true;
  }

  onDelete(id: number | undefined): void {
    if (!id) return;
    console.log('Eliminando vehículo con id:', id);
    if (confirm('¿Deseas eliminar este vehículo?')) {
      this.vehicleService.delete(id).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter((v) => v.id !== id);
           console.log('Eliminado');
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('No se pudo eliminar el vehículo');
        },
      });
    }
  }

onFormSubmit(vehicle: Vehicle) {

  if (vehicle.id) {
    // PATCH
    this.vehicleService.update(vehicle.id, vehicle).subscribe({
      next: (updated) => {
        this.vehicles = this.vehicles.map((v) => v.id === updated.id ? updated : v);
        this.showForm = false;
        this.selectedVehicle = null;
      },
      error: (err) => console.error('Error al actualizar:', err),
    });
  } else {
    // POST
    this.vehicleService.create(vehicle).subscribe({
      next: (created) => {
        this.vehicles.push(created);
        this.showForm = false;
        this.selectedVehicle = null;
      },
      error: (err) => console.error('Error al crear:', err),
    });
  }
}


  onCancel() {
    this.showForm = false;
    this.selectedVehicle = null;
  }
}
