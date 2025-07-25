import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote-result-modal',
  templateUrl: './quote-result-modal.component.html',
})
export class QuoteResultModalComponent {
  @Input() quoteResult: any;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
