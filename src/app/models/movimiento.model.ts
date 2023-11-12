export class Movimiento {
  constructor(
    public movimientoId?: number,
    public cuentaId?: number,
    public personaId?: number,
    public cliente?: string,
    public fecha?: string,
    public valor?: number,
    public saldo?: number,
    public saldoInicial?: number,
    public numeroCuenta?: string,
    public tipoCuenta?: string,
    public estadoCuenta?: boolean
  ) {
  }
}
