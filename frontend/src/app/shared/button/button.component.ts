import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() clickEvent = new EventEmitter<void>();
  
  @Input() text = 'Add New';

  clickButton() {
    this.clickEvent.emit();
  }
}
