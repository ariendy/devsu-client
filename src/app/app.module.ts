import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {ClienteFeatureModule} from './cliente-feature/cliente-feature.module';
import { CuentasFeatureModule } from './cuentas-feature/cuentas-feature.module';
import { MovimientosFeatureModule } from './movimientos-feature/movimientos-feature.module';
import { ReportesFeatureModule } from './reportes-feature/reportes-feature.module';
import { CoreUiModule } from './core-ui/core-ui.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    ClienteFeatureModule,
    BrowserModule,
    AppRoutingModule,
    CuentasFeatureModule,
    MovimientosFeatureModule,
    ReportesFeatureModule,
    CoreUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
