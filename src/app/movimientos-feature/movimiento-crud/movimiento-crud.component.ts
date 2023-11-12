import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cuenta} from '../../models/cuenta.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CuentaService} from '../../services/cuenta.service';
import {MessageService} from '../../services/message.service';
import {Movimiento} from '../../models/movimiento.model';
import {MovimientoService} from '../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-crud',
  templateUrl: './movimiento-crud.component.html',
  styleUrls: ['./movimiento-crud.component.scss']
})
export class MovimientoCrudComponent implements OnInit {

  form: FormGroup;
  id: number;
  selectedMovimiento: Movimiento;
  cuentas: Cuenta[] = [];

  constructor(
    private route: ActivatedRoute,
    private cuentaService: CuentaService,
    private movimientoService: MovimientoService,
    private router: Router,
    private messageservice: MessageService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cuentaService.getAllCuentas().subscribe((res: Cuenta[]) => {
      this.cuentas = res.sort((a, b) => {
        return a.cliente.localeCompare(b.cliente) || a.numeroCuenta.localeCompare(b.numeroCuenta);
      });
    });
    this.loadForm();
  }

  private loadForm(): void {
    this.form = new FormGroup({
      cuentaId: new FormControl({ value: null, disabled: this.id }, Validators.required),
      valor: new FormControl({ value: null, disabled: this.id }, Validators.required),
    });

    if (this.id) {
      this.movimientoService.getMovimientoById(this.id).subscribe((res: Movimiento) => {
        this.selectedMovimiento = res;
        this.form.patchValue({
          cuentaId: res.cuentaId,
          valor: res.valor
        });
      },
        error => this.messageservice.sendErrorMessage(error.error));
    }
  }

  goBackToMovimientos(): void {
    this.router.navigate(['/movimientos']);
  }

  guardarMovimiento(): void {
    if (this.validateMovimientoForm()) {
      this.mapFormToMovimiento();
      if (!(this.selectedMovimiento && this.selectedMovimiento.movimientoId)) {
        this.movimientoService.createMovimiento(this.selectedMovimiento).subscribe((res: Movimiento) => {
          this.selectedMovimiento = res;
          this.messageservice.sendSuccessMessage('El movimiento ha sido guardado.');
          this.goBackToMovimientos();
        },
          error => this.messageservice.sendErrorMessage(error.error));
      }
    }
  }

  private mapFormToMovimiento(): void {

    this.selectedMovimiento = {
      ...this.selectedMovimiento,
      cuentaId: this.form.controls.cuentaId.value,
      valor: this.form.controls.valor.value
    };

  }

  private validateMovimientoForm(): boolean {
    if (this.form.controls.cuentaId.invalid) {
      this.messageservice.sendErrorMessage('Por favor seleccione la cuenta.');
      return false;
    }
    if (isNaN(this.form.controls.valor.value)) {
      this.messageservice.sendErrorMessage('El monto debe ser un valor númerico.');
      return false;
    }

    if (this.form.controls.valor.invalid) {
      this.messageservice.sendErrorMessage('Por favor introduzca un monto.');
      return false;
    }
    return true;
  }
}
