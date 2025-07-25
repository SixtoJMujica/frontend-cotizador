// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard  {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.auth.getUserRole();

    if (currentRole === expectedRole) {
      return true;
    }

    this.router.navigate(['/quoter']);
    return false;
  }
}
