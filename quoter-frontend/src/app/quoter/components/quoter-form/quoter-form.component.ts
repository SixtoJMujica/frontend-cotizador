import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoterService } from '../../services/quoter.service';

@Component({
  selector: 'app-quoter-form',
  templateUrl: './quoter-form.component.html',
})
export class QuoterFormComponent {
  form: FormGroup;
  quoteResult: any = null;
  showModal = false;
  lastQuotes: any[] = [];
  showLastQuotesModal = false;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder, private quoterService: QuoterService) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1990), Validators.max(this.currentYear)]],
      tipoUso: ['', Validators.required],
      edadConductor: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      marca: this.form.value.marca,
      modelo: this.form.value.modelo,
      anio: Number(this.form.value.anio),
      tipoUso: this.form.value.tipoUso,
      edadConductor: Number(this.form.value.edadConductor),
    };

    this.quoterService.quoteInsurance(data).subscribe({
      next: (res) => {
        this.quoteResult = res;
        this.showModal = true;
      },
      error: (err) => {
        console.error('Error al cotizar:', err);
      }
    });
  }

  loadLastQuotes() {
    this.quoterService.getLastQuotes().subscribe({
      next: (quotes) => {
        this.lastQuotes = quotes;
        this.showLastQuotesModal = true;
      },
      error: (err) => {
        console.error('Error al obtener últimas cotizaciones:', err);
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  closeLastQuotesModal() {
    this.showLastQuotesModal = false;
  }
}
