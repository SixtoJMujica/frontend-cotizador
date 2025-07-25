import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/vehicles/service/vehicle.service';

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle-form.component.html',
})
export class VehicleFormComponent implements OnInit {
  @Input() vehicle: Vehicle | null = null;
  @Output() submit = new EventEmitter<Vehicle>();
  @Output() cancel = new EventEmitter<void>();

  vehicleForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [null, [Validators.required, Validators.min(1900)]],
    });

    if (this.vehicle) {
      this.vehicleForm.patchValue({
        marca: this.vehicle.marca,
        modelo: this.vehicle.modelo,
        anio: this.vehicle.anio,
      });
    }
  }

  onSubmit() {
  if (this.vehicleForm.invalid) return;

  const formData: Vehicle = {
    ...this.vehicleForm.value,
    anio: Number(this.vehicleForm.value.anio),
    marca: String(this.vehicleForm.value.marca),
    modelo: String(this.vehicleForm.value.modelo),
    usageType: this.vehicle?.usageType ?? '',
    id: this.vehicle?.id ?? null,
  };

  this.submit.emit(formData);
}


  onCancel() {
    this.cancel.emit();
  }
}
