import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  declarations: [CustomButtonComponent, SidebarComponent, ToggleComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomButtonComponent,
    SidebarComponent,
    ToggleComponent,
  ],
})
export class SharedModule {}
