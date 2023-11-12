import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {CuentaService} from '../../services/cuenta.service';
import {Cuenta} from '../../models/cuenta.model';
import {Usuario} from '../../models/usuario.model';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-cuenta-crud',
  templateUrl: './cuenta-crud.component.html',
  styleUrls: ['./cuenta-crud.component.scss']
})
export class CuentaCrudComponent implements OnInit {

  form: FormGroup;
  id: number;
  selectedCuenta: Cuenta;
  usuarios: Usuario[] = [];

  constructor(
    private route: ActivatedRoute,
    private cuentaService: CuentaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageservice: MessageService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getAllUsuarios().subscribe((res: Usuario[]) => {
      this.usuarios = res;
    },
      error => this.messageservice.sendErrorMessage(error.error));
    this.loadForm();
  }

  private loadForm(): void {
    this.form = new FormGroup({
      numeroCuenta: new FormControl(null, Validators.required),
      tipoCuenta: new FormControl(null, Validators.required),
      saldoInicial: new FormControl(null, Validators.required),
      personaId: new FormControl(null, Validators.required),
      estado: new FormControl(true)
    });

    if (this.id) {
      this.cuentaService.getCuentaById(this.id).subscribe((res: Cuenta) => {
        this.selectedCuenta = res;
        this.form.patchValue({
          numeroCuenta: res.numeroCuenta,
          tipoCuenta: res.tipoCuenta,
          saldoInicial: res.saldoInicial,
          personaId: res.personaId,
          estado: res.estado
        });
      });
    }
  }

  goBackToCuentas(): void {
    this.router.navigate(['/cuentas']);
  }

  guardarCuenta(): void {
    if (this.validateCuentaForm()) {
      this.mapFormToCuenta();
      if (this.selectedCuenta && this.selectedCuenta.cuentaId) {
        this.cuentaService.updateCuenta(this.selectedCuenta).subscribe((res: Cuenta) => {
          this.selectedCuenta = res;
          this.messageservice.sendSuccessMessage('La cuenta ha sido modificada.');
          this.goBackToCuentas();
        },
          error => this.messageservice.sendErrorMessage(error.error));
      } else {
        this.cuentaService.createCuenta(this.selectedCuenta).subscribe((res: Cuenta) => {
          this.selectedCuenta = res;
          this.messageservice.sendSuccessMessage('La cuenta ha sido guardada.');
          this.goBackToCuentas();
        },
          error => this.messageservice.sendErrorMessage(error.error));
      }
    }
  }

  private mapFormToCuenta(): void {

    this.selectedCuenta = {
      ...this.selectedCuenta,
      numeroCuenta: this.form.controls.numeroCuenta.value,
      tipoCuenta: this.form.controls.tipoCuenta.value,
      saldoInicial: this.form.controls.saldoInicial.value,
      personaId: this.form.controls.personaId.value,
      estado: this.form.controls.estado.value
    };

  }

  deleteCuenta(): void {
    if (this.selectedCuenta && this.selectedCuenta.cuentaId) {
      this.cuentaService.deleteCuentaById(this.selectedCuenta.cuentaId).subscribe(() => {
        this.messageservice.sendSuccessMessage('La cuenta ha sido eliminada.');
        this.goBackToCuentas();
      },
        error => this.messageservice.sendErrorMessage(error.error));
    }
  }

  private validateCuentaForm(): boolean {

    if (this.form.controls.numeroCuenta.invalid) {
      this.messageservice.sendErrorMessage('Por favor introduzca el número de cuenta.');
      return false;
    }

    if (this.form.controls.tipoCuenta.invalid) {
      this.messageservice.sendErrorMessage('Por favor introduzca el tipo de cuenta.');
      return false;
    }

    if (this.form.controls.personaId.invalid) {
      this.messageservice.sendErrorMessage('Por favor introduzca el cliente.');
      return false;
    }

    if (isNaN(this.form.controls.saldoInicial.value)) {
      this.messageservice.sendErrorMessage('El saldo inicial debe ser un valor númerico.');
      return false;
    }

    if (this.form.controls.saldoInicial.invalid) {
      this.messageservice.sendErrorMessage('Por favor introduzca un saldo inicial.');
      return false;
    }

    return true;
  }
}
