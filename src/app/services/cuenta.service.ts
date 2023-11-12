import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseRestService} from './base-rest.service';
import {Cuenta} from '../models/cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService extends BaseRestService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.endpoint = 'cuentas';
  }

  getAllCuentas(): Observable<object> {
    return this.get();
  }

  getCuentaById(cuentaId: number): Observable<object> {
    return this.get('' + cuentaId);
  }

  createCuenta(cuenta: Cuenta): Observable<object> {
    return this.post('', cuenta);
  }

  updateCuenta(cuenta: Cuenta): Observable<object> {
    return this.put('', cuenta);
  }

  deleteCuentaById(cuentaId: number): Observable<object> {
    return this.delete('' + cuentaId);
  }
}
