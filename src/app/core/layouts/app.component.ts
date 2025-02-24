import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `<router-outlet></router-outlet>`, // Renderiza los layouts según la ruta
})
export class AppComponent {}
