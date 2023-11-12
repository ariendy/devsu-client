import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CuentasFeatureComponent} from './cuentas-feature.component';
import {CuentaViewComponent} from './cuenta-view/cuenta-view.component';
import {CuentaCrudComponent} from './cuenta-crud/cuenta-crud.component';

const routes: Routes = [
  {
    path: 'cuentas', component: CuentasFeatureComponent, children: [
      {path: '', component: CuentaViewComponent},
      {path: 'add', component: CuentaCrudComponent},
      {path: ':id/edit', component: CuentaCrudComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasFeatureRoutingModule {
}
