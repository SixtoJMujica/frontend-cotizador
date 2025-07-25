import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VehicleListComponent } from 'src/app/vehicles/components/vehicle-list/vehicle-list.component';
import { VehicleService, Vehicle } from 'src/app/vehicles/service/vehicle.service';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let mockService: jasmine.SpyObj<VehicleService>;

  const mockVehicles: Vehicle[] = [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2020, usageType: '' },
    { id: 2, marca: 'Honda', modelo: 'Civic', anio: 2021, usageType: '' },
  ];

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles', 'delete', 'update', 'create']);

    TestBed.configureTestingModule({
      declarations: [VehicleListComponent],
      providers: [{ provide: VehicleService, useValue: serviceSpy }]
    });

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los vehículos al inicializar', () => {
    mockService.getVehicles.and.returnValue(of(mockVehicles));

    fixture.detectChanges(); // llama a ngOnInit()

    expect(component.vehicles.length).toBe(2);
    expect(component.vehicles[0].marca).toBe('Toyota');
    expect(mockService.getVehicles).toHaveBeenCalled();
  });

  it('debería mostrar el formulario al llamar onCreate', () => {
    component.onCreate();
    expect(component.showForm).toBeTrue();
    expect(component.selectedVehicle).toBeNull();
  });
});
