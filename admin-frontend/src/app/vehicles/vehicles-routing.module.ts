import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclePageComponent } from './pages/vehicle-page/vehicle-page.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: VehiclePageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
