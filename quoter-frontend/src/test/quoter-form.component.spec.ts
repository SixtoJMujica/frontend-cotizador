import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { QuoterFormComponent } from 'src/app/quoter/components/quoter-form/quoter-form.component';
import { QuoteResponse, QuoteRequest } from 'src/app/quoter/model/quote.models';
import { QuoterService } from 'src/app/quoter/services/quoter.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('QuoterFormComponent', () => {
  let component: QuoterFormComponent;
  let fixture: ComponentFixture<QuoterFormComponent>;
  let quoterServiceSpy: jasmine.SpyObj<QuoterService>;

  const mockResponse: QuoteResponse = {
    precioBase: 1000,
    ajustes: {
      edad: { factor: 1.1, porcentaje: '10%' },
      uso: { factor: 1.2, porcentaje: '20%' },
    },
    primaTotal: 1320,
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('QuoterService', ['quoteInsurance', 'getLastQuotes']);

    await TestBed.configureTestingModule({
      declarations: [QuoterFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{ provide: QuoterService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoterFormComponent);
    component = fixture.componentInstance;
    quoterServiceSpy = TestBed.inject(QuoterService) as jasmine.SpyObj<QuoterService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and set quoteResult', () => {
    component.form.setValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      tipoUso: 'personal',
      edadConductor: 30,
    });

    quoterServiceSpy.quoteInsurance.and.returnValue(of(mockResponse));
    component.submit();

    expect(quoterServiceSpy.quoteInsurance).toHaveBeenCalledWith({
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      tipoUso: 'personal',
      edadConductor: 30,
    } as QuoteRequest);

    expect(component.quoteResult).toEqual(mockResponse);
    expect(component.showModal).toBeTrue();
  });
});
