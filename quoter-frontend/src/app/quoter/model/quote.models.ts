export interface QuoteRequest {
  marca: string;
  modelo: string;
  anio: number;
  tipoUso: 'personal' | 'trabajo' | 'carga';
  edadConductor: number;
}

export interface QuoteAdjustmentDetail {
  factor: number;
  porcentaje: string;
}

export interface QuoteAdjustments {
  edad: QuoteAdjustmentDetail;
  uso: QuoteAdjustmentDetail;
}

export interface QuoteResponse {
  precioBase: number;
  ajustes: QuoteAdjustments;
  primaTotal: number;
}

export interface LastQuote extends QuoteRequest, QuoteResponse {
  fecha: string;
}
