import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosFeatureRoutingModule } from './movimientos-feature-routing.module';
import { MovimientosFeatureComponent } from './movimientos-feature.component';
import { MovimientoViewComponent } from './movimiento-view/movimiento-view.component';
import { MovimientoCrudComponent } from './movimiento-crud/movimiento-crud.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MovimientosFeatureComponent, MovimientoViewComponent, MovimientoCrudComponent],
    imports: [
        CommonModule,
        MovimientosFeatureRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MovimientosFeatureModule { }
