import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/layouts/main-layout/header/header.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // Si usas Angular Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Para <mat-form-field>
import { AppComponent } from './core/layouts/app.component';
import { MainLayoutModule } from './core/layouts/main-layout.module';
import { AuthLayoutModule } from './core/layouts/auth-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule, // ⚠️ Necesario para [(ngModel)]
    ReactiveFormsModule, // ⚠️ Necesario para formGroup

    MainLayoutModule,
    AuthLayoutModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
  providers: [BrowserAnimationsModule],
})
export class AppModule {}
