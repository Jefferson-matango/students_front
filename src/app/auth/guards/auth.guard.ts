import { Injectable } from '@angular/core';
import {
  
  CanActivate,
  Router,
  
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}
  canActivate(
    
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
      if( !localStorage.getItem("token") || !localStorage.getItem("user") ) {

        this.router.navigate(['/auth/login']);
        return false;

      }
      const token:any = localStorage.getItem("token")
      const expiration = (JSON.parse(atob(token.split(".")[1]))).exp;
      if( Math.floor((new Date().getTime())/1000) >= expiration ){
        this.authService.logout();
        return false
      }
      return true;
  }
}
