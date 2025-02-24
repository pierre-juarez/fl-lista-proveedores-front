import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: false,
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() text: string = 'Click';
  @Input() icon?: string;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
