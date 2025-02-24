import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { ListUsersComponent } from './user/pages/list-users/list-users.component';
import { SharedModule } from '../shared/shared.module';
import { ListProveedoresComponent } from './user/pages/list-proveedores/list-proveedores.component';

@NgModule({
  declarations: [ListProveedoresComponent],
  imports: [SharedModule, FeaturesRoutingModule],
})
export class FeaturesModule {}
