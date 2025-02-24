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
import { environment } from '../../../environments/environment.prod';
import { Token } from '../../auth/interfaces/token.interface';
import { AuthStatus } from '../enum/auth-status.enum';
import { jwtDecode } from 'jwt-decode';
import { SendMail, ValidateCode } from '../../auth/interfaces/recovery-password.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private readonly baseUrl: string = environment.baseURL;

  private http = inject(HttpClient);

  private _currentUser = signal<Token | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  login(code: string, password: string): Observable<boolean> {
    const body = { username: code, password };
    return this.http.post<any>(`${this.baseUrl}/auth`, body).pipe(
      map(({ data }) => {       
        return this.setAuthentication(data.token);
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  sendMailObtainCode(code: string): Observable<SendMail> {
    const body = { code };
    return this.http.post<SendMail>(
      `${this.baseUrl}/auth/forgot-password`,
      body
    );
  }

  validateCode(user_code: string, code: string): Observable<ValidateCode> {
    const body = { user_code, code };
    return this.http.post<ValidateCode>(
      `${this.baseUrl}/auth/validate-code`,
      body
    );
  }

  resetPassword(user_code: string, new_password: string, verification_code: string): Observable<SendMail> {
    const body = { user_code, new_password, verification_code };
    return this.http.post<SendMail>(
      `${this.baseUrl}/auth/reset-password`,
      body
    );
  }


  recuperar(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/signup`, body);
  }

  getuser(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/${code}`);
  }

  private setAuthentication(token: string): boolean {
    const payload: Token = this.getJwtPayload(token);
    
    this._currentUser.set(payload);

    if (payload.active == false) {
      this._authStatus.set(AuthStatus.checking);
    } else {
      localStorage.setItem('token', token);
      this._authStatus.set(AuthStatus.authenticated);
    }

    return true;
  }

  obtenerbyid(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auth/${code}`);
  }

  getJwtPayload(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  checkAuthStatus(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      this.logout();
      return of(false);
    }
    const token = localStorage.getItem('token');
    let currentUser;

    if (token) {
      currentUser = this.getJwtPayload(token.toString());
    }

    if (currentUser.exp < Math.floor(Date.now() / 1000)) {
      this.logout();
      return of(false);
    }

    this._currentUser.set(currentUser);

    this._authStatus.set(AuthStatus.authenticated);

    return of(true);
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.clear();
  }

  updateData(data: any) {
    this.dataSource.next(data);
  }
}