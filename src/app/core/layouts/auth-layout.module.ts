import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [AuthLayoutComponent], // Solo el layout de autenticación
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AuthLayoutComponent]
})
export class AuthLayoutModule {}
