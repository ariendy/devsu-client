import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportesFeatureComponent} from './reportes-feature.component';
import {ReporteViewComponent} from './reporte-view/reporte-view.component';

const routes: Routes = [
  {path: '', component: ReportesFeatureComponent},
  {path: 'reportes', component: ReporteViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesFeatureRoutingModule {
}
