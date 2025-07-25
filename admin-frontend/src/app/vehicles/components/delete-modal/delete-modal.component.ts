import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent {
  @Input() visible = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
