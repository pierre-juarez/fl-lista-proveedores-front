import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginCorreo } from '../../interfaces/login-correo.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidateCode } from '../../interfaces/recovery-password.interface';

@Component({
  standalone: false,
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialog {
  botonDeshabilitado: boolean = false;
  botonEnviarHabilitado: boolean = false;
  tiempoRestante: number = 0;
  intervalId: any;
  input_codigo: number = 0;
  DesabilitadoInputVerificador: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginCorreo,
    private authService: AuthService,
    private router: Router
  ) {}

  salir(): void {
    this.dialogRef.close();
  }

  validar_codigo(): void {

    this.authService.validateCode(this.data.code, String(this.input_codigo)).subscribe({
        next: (res: ValidateCode ) => {        
            if(res.data.status){
                const verification_code = localStorage.getItem('verification_code');
                if (verification_code) {
                    localStorage.removeItem('verification_code');
                  }
                  localStorage.setItem('verification_code', String(this.input_codigo));
                  this.dialogRef.close();
                  this.router.navigateByUrl('/auth/recovery-password');
            }
        },
        error: (err: HttpErrorResponse) => {        
            Swal.fire({
                title: 'Error',
                text: `${err.error.message}`,
                icon: 'error',
              });
        }
    })
  }

  enviar_codigo(): void {
    this.botonDeshabilitado = true;
    this.tiempoRestante = 60;
    this.DesabilitadoInputVerificador = false;
    this.botonEnviarHabilitado = true;

    this.authService.sendMailObtainCode(this.data.code).subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error',
          text: `Hubo un problema al enviar el código: ${err.message}`,
          icon: 'error',
        });
      },
    });

    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalId);
        this.botonDeshabilitado = false;
        this.botonEnviarHabilitado = false;
      }
    }, 1000);
  }
}
