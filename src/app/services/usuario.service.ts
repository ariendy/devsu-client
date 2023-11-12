import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseRestService} from './base-rest.service';
import {Usuario} from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseRestService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.endpoint = 'clientes';
  }

  getAllUsuarios(): Observable<object> {
    return this.get();
  }

  getUsuarioById(personId: number): Observable<object> {
    return this.get(personId + '');
  }

  createUsuario(usuario: Usuario): Observable<object> {
    return this.post('', usuario);
  }

  updateUsuario(usuario: Usuario): Observable<object> {
    return this.put('', usuario);
  }

  deleteUsuarioById(clienteId: number): Observable<object> {
    return this.delete('/' + clienteId);
  }
}
