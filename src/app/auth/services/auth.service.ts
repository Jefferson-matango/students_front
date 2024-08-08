import { HttpClient } from '@angular/common/http';

import { computed, inject, Injectable, signal } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { Router } from '@angular/router';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = URL_SERVICES
  private http = inject( HttpClient );

  private _currentUser = signal<User|null> (null);
  private _authStatus = signal<AuthStatus> (AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  user:any;
  token: any;

  constructor(
    private router: Router
  ) { 
    this.getLocalStorage();
  }

  login( email:string, password: string ): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        tap( ({data}) => {
          const {access_token, user} = data;
          this._currentUser.set(user);
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem('token', access_token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('authenticated', 'true');
          console.log({user, access_token})
        }),
        map( () => true),
        catchError((error:any) => {
          console.log(error)
          return of(false)
        })
      );
  }

  register(name:string, email: string, password: string, password_confirmation: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password, password_confirmation };

    return this.http.post<RegisterResponse>(url, body)
      .pipe(
        tap(({ user }) => {
          console.log({ user });
        }),
        map(() => true),
        catchError((error: any) => {
          console.log(error);
          return of(false);
        })
      );
  }

  getLocalStorage () {
    if( localStorage.getItem('token') && localStorage.getItem('user')){
      const user = localStorage.getItem('user');
      this.user = JSON.parse(user? user : '');
      this.token = localStorage.getItem('token')
    }else {
      this.user = null;
      this.token = null;
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('authenticated');
    this.router.navigate(['auth/login']);
  }
}
