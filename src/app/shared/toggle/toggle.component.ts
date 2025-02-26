import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toggle-custom',
  standalone: false,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
