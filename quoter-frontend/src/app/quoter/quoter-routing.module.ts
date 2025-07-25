import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoterLayoutComponent } from './layout/quoter-layout/quoter-layout.component';
import { QuoterPageComponent } from './pages/quoter-page/quoter-page.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: QuoterLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: QuoterPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoterRoutingModule { }
