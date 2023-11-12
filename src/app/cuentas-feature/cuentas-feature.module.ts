import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CuentasFeatureRoutingModule} from './cuentas-feature-routing.module';
import {CuentaViewComponent} from './cuenta-view/cuenta-view.component';
import {CuentasFeatureComponent} from './cuentas-feature.component';
import {CuentaCrudComponent} from './cuenta-crud/cuenta-crud.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CuentaViewComponent, CuentasFeatureComponent, CuentaCrudComponent],
  imports: [
    CommonModule,
    CuentasFeatureRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CuentasFeatureModule {
}
