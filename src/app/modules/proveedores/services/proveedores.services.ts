import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Proveedor } from '../interfaces/proveedor.interface';
import { ProveedorDetail } from '../interfaces/proveedor-detail.interface';
import { Marca } from '../interfaces/marca.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor() {}
  private readonly baseUrl: string = environment.baseURL;
  private http = inject(HttpClient);

  getProveedores(): Observable<Proveedor[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/notify_proveedor/get`;
    return this.http
      .get<{ data: Proveedor[] }>(url, {
        headers,
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error obteniendo proveedores', error);
          return throwError(() => error);
        })
      );
  }

  getProveedorById(id: number): Observable<ProveedorDetail> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/notify_proveedor/get/${id}`;
    return this.http
      .get<{ data: ProveedorDetail }>(url, {
        headers,
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error obteniendo proveedores', error);
          return throwError(() => error);
        })
      );
  }

  getMarcaById(id: string): Observable<Marca> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/notify_marca/get/${id}`;
    return this.http
      .get<{ data: Marca }>(url, {
        headers,
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('Error obteniendo marcas', error);
          return throwError(() => error);
        })
      );
  }
}
