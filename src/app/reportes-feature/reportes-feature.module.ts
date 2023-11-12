import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';

import {ReportesFeatureRoutingModule} from './reportes-feature-routing.module';
import {ReporteViewComponent} from './reporte-view/reporte-view.component';
import {ReportesFeatureComponent} from './reportes-feature.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ReporteViewComponent, ReportesFeatureComponent],
  imports: [
    CommonModule,
    ReportesFeatureRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe
  ]
})
export class ReportesFeatureModule {
}
