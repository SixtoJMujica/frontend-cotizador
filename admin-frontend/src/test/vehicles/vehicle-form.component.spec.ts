import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { VehicleFormComponent } from 'src/app/vehicles/components/vehicle-form/vehicle-form.component';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un formulario inválido inicialmente', () => {
    expect(component.vehicleForm.valid).toBeFalse();
  });

  it('debería emitir `submit` cuando el formulario es válido y se hace submit', () => {
    spyOn(component.submit, 'emit');

    component.vehicleForm.setValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
    });

    component.onSubmit();

    expect(component.submit.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
    }));
  });

  it('debería emitir `cancel` al llamar onCancel', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
