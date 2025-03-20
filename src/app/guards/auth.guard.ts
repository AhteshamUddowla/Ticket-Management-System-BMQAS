import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};

// If user is logged in & tries to redirect to login page redirect them into tickets page
export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  debugger
  if (authService.isLoggedIn()) {
    router.navigate(['/tickets']);  
    return false;  
  }
  
  return true; 
};


export const redirectIfEmployeeOrGuestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserDetails().pipe(
    map(user => {
      if (user && (user.role === 'employee' || user.role === 'guest')) {
        router.navigate(['/tickets']);
        return false; 
      }

      return true;
    })
  );
};

export const redirectIfGuestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserDetails().pipe(
    map(user => {
      if (user && (user.role === 'guest')) {
        router.navigate(['/tickets']);
        return false; 
      }

      return true;
    })
  );
};