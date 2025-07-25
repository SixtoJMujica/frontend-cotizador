import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  showForm = false;

  showDeleteModal = false;
  idToDelete: number | null = null;

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

  confirmDelete(id: number | undefined) {
  if (id === undefined) return;
  this.idToDelete = id;
  this.showDeleteModal = true;
}

  cancelDelete() {
    this.showDeleteModal = false;
    this.idToDelete = null;
  }

  deleteVehicle() {
    if (!this.idToDelete) return;

    this.vehicleService.delete(this.idToDelete).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter((v) => v.id !== this.idToDelete);
        this.cancelDelete();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        this.cancelDelete();
      },
    });
  }

  onFormSubmit(vehicle: Vehicle) {
    if (vehicle.id) {
      this.vehicleService.update(vehicle.id, vehicle).subscribe({
        next: (updated) => {
          this.vehicles = this.vehicles.map((v) => v.id === updated.id ? updated : v);
          this.showForm = false;
          this.selectedVehicle = null;
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
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
