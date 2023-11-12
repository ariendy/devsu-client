import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseRestService} from './base-rest.service';
import {Movimiento} from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService extends BaseRestService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.endpoint = 'movimientos';
  }

  getAllMovimientos(): Observable<object> {
    return this.get();
  }

  getMovimientoById(movimientoId: number): Observable<object> {
    return this.get('/' + movimientoId);
  }


  getAllMovimientosByDateRange(start: string, end: string): Observable<object> {
    const params: HttpParams = new HttpParams()
      .append('start', start)
      .append('end', end);
    return this.get('report', params);
  }


  createMovimiento(movimiento: Movimiento): Observable<object> {
    return this.post('', movimiento);
  }
}
