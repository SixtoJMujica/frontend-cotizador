import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';



@Component({
  selector: 'app-quoter-layout',
  templateUrl: './quoter-layout.component.html',
})
export class QuoterLayoutComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  goToAdmin() {
    // Por ahora, solo mostramos un log. Más adelante se puede rutear al microfrontend
    console.log('Ir al admin... (microfrontend luego)');
    // this.router.navigate(['/admin']); ← cuando esté listo
  }
}
