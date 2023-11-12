import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovimientosFeatureComponent} from './movimientos-feature.component';
import {MovimientoViewComponent} from './movimiento-view/movimiento-view.component';
import {MovimientoCrudComponent} from './movimiento-crud/movimiento-crud.component';

const routes: Routes = [
  {
    path: 'movimientos', component: MovimientosFeatureComponent, children: [
      {path: '', component: MovimientoViewComponent},
      {path: 'add', component: MovimientoCrudComponent},
      {path: ':id/edit', component: MovimientoCrudComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosFeatureRoutingModule {
}
