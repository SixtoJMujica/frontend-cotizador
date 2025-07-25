import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginGuard } from '../core/guards/login.guard';
import { QuoterPageComponent } from '../quoter/pages/quoter-page/quoter-page.component';


const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [LoginGuard],
  },
   {
    path: 'quoter',
    component: QuoterPageComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
