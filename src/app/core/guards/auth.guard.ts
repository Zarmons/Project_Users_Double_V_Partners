import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  alertComponent: any;
  constructor(private router: Router, private messageService: MessageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const score = Number(route.queryParamMap.get('score'));

    if (score >= 0) {
      return true;
    } else {
      alert('El usuario tiene un score menor a 30, no puede acceder al perfil');
      return this.router.parseUrl('/');
    }
  }
}
