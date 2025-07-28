import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleService, Vehicle } from 'src/app/vehicles/service/vehicle.service';
import { environment } from 'src/environments/environment';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/vehicle`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService],
    });

    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener la lista de vehículos', () => {
    const mockVehicles: Vehicle[] = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2020 },
      { id: 2, marca: 'Honda', modelo: 'Civic', anio: 2021 },
    ];

    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles.length).toBe(2);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('debería crear un vehículo', () => {
    const newVehicle: Vehicle = { marca: 'Ford', modelo: 'Fiesta', anio: 2022 };

    service.create(newVehicle).subscribe((res) => {
      expect(res).toEqual({ ...newVehicle, id: 1 });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newVehicle, id: 1 });
  });

  it('debería eliminar un vehículo por id', () => {
    service.delete(5).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
