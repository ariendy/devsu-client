import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {Cuenta} from '../../models/cuenta.model';
import {of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {CuentaService} from '../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-view',
  templateUrl: './cuenta-view.component.html',
  styleUrls: ['./cuenta-view.component.scss']
})
export class CuentaViewComponent implements OnInit {

  clientToSearch = '';
  displayedCuentas: Cuenta[];
  cuentas: Cuenta[];

  constructor(public cuentaService: CuentaService) {
  }

  ngOnInit(): void {
    this.cuentaService.getAllCuentas().subscribe((res: Usuario[]) => {
      this.cuentas = res;
      this.displayedCuentas = res;
    });
  }

  onSearchValue(event: any): void {
    of(event.target.value).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => {
        if (!term || !term.length) {
          return this.cuentas;
        } else {
          return this.cuentas
            .filter(v => v.numeroCuenta.toLowerCase().indexOf(term.toLowerCase()) > -1);
        }
      }))
      .subscribe(res => {
        this.displayedCuentas = res;
      });
  }
}
