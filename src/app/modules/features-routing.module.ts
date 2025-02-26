import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../core/layouts/main-layout/header/header.component';
import { ListUsersComponent } from './user/pages/list-users/list-users.component';
import { ListProveedoresComponent } from './user/pages/list-proveedores/list-proveedores.component';
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
