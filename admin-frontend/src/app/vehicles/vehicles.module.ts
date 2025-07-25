import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form/vehicle-form.component';
import { VehiclePageComponent } from './pages/vehicle-page/vehicle-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VehicleRoutingModule } from './vehicles-routing.module';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';


@NgModule({
  declarations: [VehicleListComponent, VehicleFormComponent, VehiclePageComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class VehiclesModule { }
