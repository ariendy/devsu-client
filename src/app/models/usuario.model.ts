export class Usuario {
  constructor(
    public clienteId?: number,
    public personaId?: number,
    public contrasenia?: string,
    public identificacion?: string,
    public nombre?: string,
    public genero?: string,
    public edad?: string,
    public direccion?: string,
    public telefono?: string,
    public estado?: boolean
  ) {
  }
}
