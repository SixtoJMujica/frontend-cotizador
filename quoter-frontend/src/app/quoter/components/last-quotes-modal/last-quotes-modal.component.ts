import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-last-quotes-modal',
  templateUrl: './last-quotes-modal.component.html',
})
export class LastQuotesModalComponent {
  @Input() quotes: any[] = [];
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
