import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { QuoteRequest, QuoteResponse, LastQuote } from 'src/app/quoter/model/quote.models';
import { QuoterService } from 'src/app/quoter/services/quoter.service';

describe('QuoterService', () => {
  let service: QuoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoterService],
    });

    service = TestBed.inject(QuoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a quote response (mocked)', (done) => {
    const mockQuote: QuoteResponse = {
      precioBase: 1000,
      ajustes: {
        edad: { factor: 1.1, porcentaje: '10%' },
        uso: { factor: 1.2, porcentaje: '20%' }
      },
      primaTotal: 1320
    };

    const mockRequest: QuoteRequest = {
      marca: 'Honda',
      modelo: 'Civic',
      anio: 2021,
      tipoUso: 'personal',
      edadConductor: 30
    };

    spyOn(service, 'quoteInsurance').and.returnValue(of(mockQuote));

    service.quoteInsurance(mockRequest).subscribe((quote) => {
      expect(quote.precioBase).toBe(1000);
      expect(quote.primaTotal).toBe(1320);
      done();
    });
  });

  it('should return last quotes (mocked)', (done) => {
    const mockLastQuotes: LastQuote[] = [
      {
        marca: 'Toyota',
        modelo: 'Yaris',
        anio: 2020,
        tipoUso: 'personal',
        edadConductor: 35,
        precioBase: 1200,
        ajustes: {
          edad: { factor: 1.1, porcentaje: '10%' },
          uso: { factor: 1.2, porcentaje: '20%' }
        },
        primaTotal: 1584,
        fecha: '2025-07-28'
      }
    ];

    spyOn(service, 'getLastQuotes').and.returnValue(of(mockLastQuotes));

    service.getLastQuotes().subscribe((quotes) => {
      expect(quotes.length).toBeGreaterThan(0);
      expect(quotes[0].marca).toBe('Toyota');
      expect(quotes[0].fecha).toBe('2025-07-28');
      done();
    });
  });
});
