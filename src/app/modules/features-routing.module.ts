import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../core/layouts/main-layout/header/header.component';
import { ListProveedoresComponent } from './proveedores/pages/list-proveedores/list-proveedores.component';
import { GestionUsuariosComponent } from './admin/pages/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListProveedoresComponent,
  },
  {
    path: 'admin',
    component: GestionUsuariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
