import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './main-layout/header/header.component'; // Asegúrate de importarlo si está dentro de MainLayout

@NgModule({
  // HeaderComponent
  declarations: [MainLayoutComponent, HeaderComponent], // Componentes que pertenecen a este layout
  imports: [
    CommonModule,
    RouterModule, // Permite que el layout cargue sus rutas hijas
  ],
  exports: [MainLayoutComponent], // Para que otros módulos puedan usarlo
})
export class MainLayoutModule {}
