import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../modules/user/services/user.service';
import { LoginDialog } from '../../dialogs/login/login-dialog.component';

@Component({
  standalone: false,
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  code: string = '';
  password: string = '';

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  showPassword: boolean = false;

  passwordsMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const verification_code = localStorage.getItem('verification_code');
    let verification_code_parse = null;

    if (verification_code) {
      verification_code_parse = JSON.parse(verification_code);
    }

    const { code, password } = this.loginForm.value;
    Swal.fire({
      title: 'Iniciando sesión...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService
      .resetPassword(code, password, verification_code_parse)
      .subscribe({
        next: () => {
          Swal.close();
            this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          Swal.close();
          Swal.fire({
            title: 'El inicio de sesión falló',
            text: err.error.message || 'Inténtalo de nuevo más tarde.',
            icon: 'error',
          });
        },
      });
  }

  onRecoverPassword(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const { code } = this.loginForm.value;
    if (code) {
      this.userService.getUserByCode(code).subscribe(
        (response) => {
          if (response && response.data) {
            this.dialog.open(LoginDialog, {
              height: 'auto',
              width: '360px',
              data: { code: code, email: response.data.email },
              autoFocus: true,
              closeOnNavigation: true,
              hasBackdrop: true,
              enterAnimationDuration,
              exitAnimationDuration,
            });
          } else {
            Swal.fire(
              'ERROR',
              'No existe el código del colaborador : ' + code,
              'error'
            );
          }
        },
        (error: HttpErrorResponse) => {
          const message = error.error.data || 'Inténtalo de nuevo más tarde.';

          Swal.fire('Hubo un error', `${message}`, 'error');
        }
      );
    } else {
      Swal.fire({
        title: 'Ingresa tu código de colaborador',
        icon: 'warning',
      });
    }
  }

  onInputChange(event: any) {
    const input = event.target.value;
    const regex = /^([0-9]{1,6}?)$/;
    if (!regex.test(input)) {
      event.target.value = input.slice(0, input.length - 1);
    }
  }

  onBack(){
    this.router.navigateByUrl('/auth/login');
  }
}
