import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Movimiento} from '../../models/movimiento.model';
import {MovimientoService} from '../../services/movimiento.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-movimiento-view',
  templateUrl: './movimiento-view.component.html',
  styleUrls: ['./movimiento-view.component.scss']
})
export class MovimientoViewComponent implements OnInit {

  movimientoToSearch = '';
  displayedMovimientos: Movimiento[];
  movimientos: Movimiento[];

  constructor(public movimientoService: MovimientoService, private messageservice: MessageService) {
  }

  ngOnInit(): void {
    this.movimientoService.getAllMovimientos().subscribe((res: Movimiento[]) => {
      this.movimientos = res;
      this.displayedMovimientos = res;
    },
      error => this.messageservice.sendErrorMessage(error.error));
  }

  onSearchValue(event: any): void {
    of(event.target.value).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => {
        if (!term || !term.length) {
          return this.movimientos;
        } else {
          const res = this.movimientos
            .filter(v => v.numeroCuenta.toLowerCase().indexOf(term.toLowerCase()) > -1
              || v.cliente.toLowerCase().indexOf(term.toLowerCase()) > -1);
          return res;
        }
      }))
      .subscribe(res => {
        this.displayedMovimientos = res;
      });
  }
}
