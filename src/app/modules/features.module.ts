import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListProveedoresComponent } from './proveedores/pages/list-proveedores/list-proveedores.component';
import { GestionUsuariosComponent } from './admin/pages/gestion-usuarios/gestion-usuarios.component';

@NgModule({
  declarations: [ListProveedoresComponent, GestionUsuariosComponent],
  imports: [SharedModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
