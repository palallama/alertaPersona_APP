import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { from, lastValueFrom, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreferenciasClave, Usuario, UsuarioLogueado, UsuarioPreferencia, UsuarioPreferencias } from '../interfaz/usuario';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';
import { StorageKeys } from '../interfaz/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private API_BASEURL = environment.API_BASEURL;
  private API_PORT = environment.API_PORT;
  private API_VERSION = environment.API_VERSION;
  private URL_COMPLETA = (this.API_PORT!='') ? `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}` : `${this.API_BASEURL}/${this.API_VERSION}`;

  getUsuario(usuarioId:string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}`);
  }

  getUsuarios(){
    return this.http.get(`${this.URL_COMPLETA}/usuario/`);
  }

  insertUsuario(usuario:Usuario){
    // return this.http.post(`${this.URL_COMPLETA}/usuario/`, usuario);
    
    return this.http.post(`${this.URL_COMPLETA}/auth/crearUsuario`, usuario);
  }

  updateUsuario(usuario:Usuario){
    return this.http.patch(`${this.URL_COMPLETA}/usuario/${usuario.id}`, usuario);
  }

  deleteUsuario(usuarioId:string){
    return this.http.delete(`${this.URL_COMPLETA}/usuario/${usuarioId}`);
  }

  // Gestiones

  setNotificacionToken(usuarioId:string, token:string) {
    // const aux = {
    //   id: usuarioId,
    //   token: token
    // }
    // return this.http.post(`${this.URL_COMPLETA}/usuario/${usuarioId}/setNotificacionToken`, aux);

    const aux = {
      usuarioId,
      "clave": "notiToken",
      "valor": token
    }

    return this.http.post(`${this.URL_COMPLETA}/usuario-adicional/`, aux);
  }

  iniciarSesion(mail:string, password:string) {
    return this.http.post(`${this.URL_COMPLETA}/auth/login`, { mail: mail, password:password });//);
  }

  cerrarSesion() {
    this.storageService.remove(StorageKeys.TOKEN);
  }

  async getUsuarioLoggeado() : Promise<UsuarioLogueado | undefined > {
    try {
      const token = await this.storageService.get(StorageKeys.TOKEN);
      const response$ = this.http.get<UsuarioLogueado>(`${this.URL_COMPLETA}/auth/profile`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      return await lastValueFrom(response$);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
    return undefined;
  }

  cambiarCotrasena(nuevaContrasena:string, contrasenaActual:string) {
    return this.http.post(`${this.URL_COMPLETA}/auth/cambiar-contrasena`, { nuevaContrasena, contrasenaActual });
  }
  getUsuarioPreferencias(usuarioId: string){
    // return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}/preferencias`).pipe(map( (res:any) => res.data ));
    return this.http.get(`${this.URL_COMPLETA}/usuario-preferencias/usuario/${usuarioId}`);
  }
  setDelUsuarioPreferencias(usuarioId: string, preferencia: UsuarioPreferencia){
    // return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}/preferencias/${preferencia.clave}`).pipe(map( (res:any) => res.data ));
    return this.http.get(`${this.URL_COMPLETA}/usuario-preferencias/usuario/${usuarioId}/clave/${preferencia.clave}/setDel`);
  }
  forgotPassword(mail:string) {
    // mail = mail.replace('@', "%40");
    return this.http.post(`${this.URL_COMPLETA}/auth/solicitar-codigo`, { email: mail });
  }
  verificarCodigoPassword(mail:string, code:string) {
    // mail = mail.replace('@', "%40");
    return this.http.post(`${this.URL_COMPLETA}/auth/verificar-codigo`, { email: mail, codigo:code });
  }

  resetearContrasena(email: string, password: string) {
  return from(this.storageService.get(StorageKeys.CODIGO_RECUPERO)).pipe(
    switchMap(codigo => {
      return this.http.post(`${this.URL_COMPLETA}/auth/resetear-contrasena`, { 
        email, 
        nuevaContrasena:password, 
        codigo 
      });
    })
  );
}
  // resetearContrasena(email:string, password:string) {
  //   let codigo = this.storageService.get(StorageKeys.CODIGO_RECUPERO);
  //   return this.http.post(`${this.URL_COMPLETA}/auth/resetear-contrasena`, { email, password, codigo });
  // }

}
