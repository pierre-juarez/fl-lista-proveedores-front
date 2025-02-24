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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private readonly baseUrl: string = environment.baseURL;
  private http = inject(HttpClient);

  getUserByCode(code: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.baseUrl}/usuario/code/${code}`, {
        headers: headers
    })
  }
}
