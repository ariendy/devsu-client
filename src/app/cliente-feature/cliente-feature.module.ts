import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';
import {ClienteFeatureRoutingModule} from './cliente-feature-routing.module';
import { ClienteFeatureComponent } from './cliente-feature.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClienteCrudComponent } from './cliente-crud/cliente-crud.component';



@NgModule({
  declarations: [ClienteViewComponent, ClienteFeatureComponent, ClienteCrudComponent],
  imports: [
    CommonModule,
    ClienteFeatureRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClienteFeatureModule { }
