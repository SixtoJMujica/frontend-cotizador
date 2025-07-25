import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface QuoteRequest {
  marca: string;
  modelo: string;
  anio: number;
  tipoUso: string;
  edadConductor: number;
}

interface QuoteResponse {
  precio: number;
  cobertura: string;
}

interface LastQuote {
  marca: string;
  modelo: string;
  anio: number;
  tipoUso: string;
  edadConductor: number;
  fecha: string;
  precioBase: number;
  ajustes: number;
  primaTotal: number;
}


@Injectable({ providedIn: 'root' })
class QuoterService {
  private readonly API_URL = `https://fake-api.com/api/quotes`;
  constructor(private http: HttpClient) {}

  quoteInsurance(data: QuoteRequest) {
    return this.http.post<QuoteResponse>(`${this.API_URL}`, data);
  }

  getLastQuotes() {
    return this.http.get<LastQuote[]>(`${this.API_URL}/last`);
  }
}

// ✅ Test completo
describe('QuoterService', () => {
  let service: QuoterService;
  let httpMock: HttpTestingController;
  const API_URL = `https://fake-api.com/api/quotes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoterService],
    });

    service = TestBed.inject(QuoterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST to quoteInsurance and return QuoteResponse', () => {
    const mockRequest: QuoteRequest = {
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2020,
      tipoUso: 'personal',
      edadConductor: 30,
    };

    const mockResponse: QuoteResponse = {
      precio: 1200,
      cobertura: 'Todo riesgo',
    };

    service.quoteInsurance(mockRequest).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should GET last quotes', () => {
    const mockLastQuotes: LastQuote[] = [
      {
        marca: 'Hyundai',
        modelo: 'Elantra',
        anio: 2019,
        tipoUso: 'trabajo',
        edadConductor: 45,
        fecha: '2025-07-25T10:00:00Z',
        precioBase: 900,
        ajustes: 100,
        primaTotal: 1000,
      },
    ];

    service.getLastQuotes().subscribe((quotes) => {
      expect(quotes.length).toBe(1);
      expect(quotes).toEqual(mockLastQuotes);
    });

    const req = httpMock.expectOne(`${API_URL}/last`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLastQuotes);
  });
});
