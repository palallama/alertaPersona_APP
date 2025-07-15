import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicio/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const usr = await this.usuarioService.getUsuarioLoggeado();
    if (!usr) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
