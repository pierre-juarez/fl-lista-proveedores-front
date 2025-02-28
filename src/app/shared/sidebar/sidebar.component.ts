import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'sidebar-custom',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isSidebarOpen = false;
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() buttonAction = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  openSidebar() {
    console.log('Abriendo sidebar');
    this.isSidebarOpen = true;
    this.opened.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSidebarOpen']) {
      console.log(
        'Sidebar: isSidebarOpen cambió a:',
        changes['isSidebarOpen'].currentValue
      );
    }
  }

  closeSidebar() {
    console.log('Cerrando sidebar');
    this.close.emit();
  }

  onButtonClick() {
    console.log('Botón clickado');
    this.buttonAction.emit();
  }
}
