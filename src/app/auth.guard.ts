import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _roouter = inject(Router)
  const auth = inject(AuthService)
  if (auth.isAuthenticated()) {
    return true;
  }
  else {
    _roouter.navigate(['/login'])
    return false;
  }
};
