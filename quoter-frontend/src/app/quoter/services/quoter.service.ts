import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { QuoteRequest, QuoteResponse, LastQuote } from '../model/quote.models';


@Injectable({ providedIn: 'root' })
export class QuoterService {
  private readonly API_URL = `${environment.apiUrl}/quotes`;

  constructor(private http: HttpClient) {}

  quoteInsurance(data: QuoteRequest): Observable<QuoteResponse> {
    return this.http.post<QuoteResponse>(`${this.API_URL}`, data);
  }

  getLastQuotes(): Observable<LastQuote[]> {
    return this.http.get<LastQuote[]>(`${this.API_URL}/last`);
  }
}
