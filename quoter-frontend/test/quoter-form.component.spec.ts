import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { QuoterFormComponent } from 'src/app/quoter/components/quoter-form/quoter-form.component';
import { QuoterService } from 'src/app/quoter/services/quoter.service';

describe('QuoterFormComponent', () => {
  let component: QuoterFormComponent;
  let fixture: ComponentFixture<QuoterFormComponent>;
  let mockService: jasmine.SpyObj<QuoterService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('QuoterService', ['quoteInsurance', 'getLastQuotes']);

    await TestBed.configureTestingModule({
      declarations: [QuoterFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: QuoterService, useValue: serviceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(QuoterFormComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(QuoterService) as jasmine.SpyObj<QuoterService>;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido al inicio', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('debería llamar al servicio de cotización al hacer submit con formulario válido', () => {
    const mockQuoteResponse = {
      precioBase: 1000,
      ajustes: {
        edad: { valor: 50, descripcion: 'Edad del conductor: 30 años' },
        uso: { valor: -100, descripcion: 'Uso personal' },
        marca: { valor: 150, descripcion: 'Marca Toyota' },
        riesgo: { valor: 0, descripcion: 'Riesgo bajo' }
      },
      primaTotal: 1050
    };

    component.form.setValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      tipoUso: 'personal',
      edadConductor: 30
    });

    component.submit();

    expect(mockService.quoteInsurance).toHaveBeenCalledWith(jasmine.objectContaining({
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      tipoUso: 'personal',
      edadConductor: 30
    }));

    expect(component.showModal).toBeTrue();
    expect(component.quoteResult).toEqual(mockQuoteResponse);
  });

  it('debería cargar últimas cotizaciones al llamar loadLastQuotes()', () => {
    const mockQuotes = [
      {
        id: 1,
        marca: 'Hyundai',
        modelo: 'Elantra',
        anio: 2019,
        tipoUso: 'trabajo',
        edadConductor: 45,
        fecha: '2025-07-25T10:00:00Z',
        precioBase: 900,
        ajustes: {
          edad: { valor: 40, descripcion: 'Edad del conductor' },
          uso: { valor: -50, descripcion: 'Uso trabajo' },
          marca: { valor: 100, descripcion: 'Marca Hyundai' },
          riesgo: { valor: 10, descripcion: 'Riesgo medio' }
        },
        primaTotal: 1000
      }
    ];

    component.loadLastQuotes();

    expect(mockService.getLastQuotes).toHaveBeenCalled();
    expect(component.lastQuotes).toEqual(mockQuotes);
    expect(component.showLastQuotesModal).toBeTrue();
  });

  it('debería cerrar los modales correctamente', () => {
    component.showModal = true;
    component.showLastQuotesModal = true;

    component.closeModal();
    component.closeLastQuotesModal();

    expect(component.showModal).toBeFalse();
    expect(component.showLastQuotesModal).toBeFalse();
  });
});
