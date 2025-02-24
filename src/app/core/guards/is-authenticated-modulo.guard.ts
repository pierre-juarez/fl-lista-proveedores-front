import { CanActivateFn, Router } from '@angular/router'; 
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const ModuloGuard = (requiredModulos: string[], requiredFna: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    const currentUser = authService.currentUser();

    //const hasRequiredModulos = requiredModulos.some(modulo => currentUser?.permisos.modulos_id.includes(modulo));

    // Verifica si requiredFna está vacío o nulo
    //const hasRequiredFna = !requiredFna || requiredFna.length === 0 || requiredFna.some(fna => currentUser?.permisos.fna_id.includes(fna));

    // if (hasRequiredModulos && hasRequiredFna) {
    //   return true;
    // }

    router.navigateByUrl('/');
    return false;
  };
};
