import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const usuarioGuard: CanActivateFn = (route, state) => {
  const perfil: string = 'User';

  if (perfil !== 'Admin') {
    Swal.fire('Acesso negado!', 'Você não possui permissão para acessar esta página.', 'error');
    inject(Router).navigateByUrl('/usuarios')
    return false;
  }
  return true;
};
