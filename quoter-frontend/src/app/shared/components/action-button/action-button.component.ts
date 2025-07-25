import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
})
export class ActionButtonComponent {
  @Input() label = '';
  @Input() color: 'primary' | 'danger' = 'primary';

  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
