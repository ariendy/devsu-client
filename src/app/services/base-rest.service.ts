import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseRestService {
  protected baseURL: string;
  protected headers: HttpHeaders;
  protected endpoint: string | undefined;

  constructor(protected httpClient: HttpClient) {
    this.baseURL = environment.apiUrl;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.headers = headers;
  }

  protected get(resource: string = '', params?: HttpParams): Observable<object> {
    return this.httpClient.get(this.baseURL + '/' + this.endpoint + '/' + resource, { headers: this.headers, params });
  }

  protected post(resource: string = '', data?: any, params?: HttpParams): Observable<object> {
    return this.httpClient.post(this.baseURL + '/' + this.endpoint + '/' + resource, data, { headers: this.headers, params });
  }

  protected put(resource: string = '', data?: any, params?: HttpParams): Observable<object> {
    return this.httpClient.put(this.baseURL + '/' + this.endpoint + '/' + resource, data, { headers: this.headers, params });
  }

  protected delete(resource: string = '', params?: HttpParams): Observable<object> {
    return this.httpClient.delete(this.baseURL + '/' + this.endpoint + '/' + resource, { headers: this.headers, params });
  }
}
