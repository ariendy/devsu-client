export class Cuenta {
  constructor(
    public cuentaId?: number,
    public numeroCuenta?: string,
    public tipoCuenta?: string,
    public valor?: number,
    public saldoInicial?: number,
    public estado?: boolean,
    public cliente?: string,
    public personaId?: number
  ) {
  }
}
