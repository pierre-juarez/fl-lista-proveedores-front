import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginDialog } from './dialogs/login/login-dialog.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialog,
    RecoveryPasswordComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule {}
