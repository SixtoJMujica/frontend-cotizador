import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuoterLayoutComponent } from './layout/quoter-layout/quoter-layout.component';
import { QuoterPageComponent } from './pages/quoter-page/quoter-page.component';
import { QuoterRoutingModule } from './quoter-routing.module';
import { ActionButtonComponent } from '../shared/components/action-button/action-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LastQuotesModalComponent } from './components/last-quotes-modal/last-quotes-modal.component';
import { QuoterFormComponent } from './components/quoter-form/quoter-form.component';
import { QuoteResultModalComponent } from './components/quote-result-modal/quote-result-modal.component';

@NgModule({
  declarations: [
    QuoterLayoutComponent,
    QuoterPageComponent,
    QuoterFormComponent,
    ActionButtonComponent,
    QuoteResultModalComponent,
    LastQuotesModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    QuoterRoutingModule,
    ReactiveFormsModule,

  ],
  exports: [ActionButtonComponent],
})
export class QuoterModule {}
