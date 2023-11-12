import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteViewComponent} from './cliente-view/cliente-view.component';
import {ClienteFeatureComponent} from './cliente-feature.component';
import {ClienteCrudComponent} from './cliente-crud/cliente-crud.component';

const routes: Routes = [
  {
    path: 'clientes', component: ClienteFeatureComponent, children: [
      {path: '', component: ClienteViewComponent},
      {path: 'add', component: ClienteCrudComponent},
      {path: ':id/edit', component: ClienteCrudComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteFeatureRoutingModule {
}
