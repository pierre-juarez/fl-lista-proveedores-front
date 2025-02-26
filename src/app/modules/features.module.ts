import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { ListUsersComponent } from './user/pages/list-users/list-users.component';
import { SharedModule } from '../shared/shared.module';
import { ListProveedoresComponent } from './user/pages/list-proveedores/list-proveedores.component';
import { GestionUsuariosComponent } from './admin/pages/gestion-usuarios/gestion-usuarios.component';

@NgModule({
  declarations: [ListProveedoresComponent, GestionUsuariosComponent],
  imports: [SharedModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
