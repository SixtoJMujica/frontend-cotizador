import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';



@Injectable({ providedIn: 'root' })
export class LoginGuard  {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/quoter']);
      return false;
    } else {
      return true;
    }
  }
}
