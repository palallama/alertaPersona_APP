import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioPreferencia, UsuarioPreferencias } from '../interfaz/usuario';
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

  credenciales = [
    {
      "usuario": "julian@mail.com",
      "password": "123"
    },
    {
      "usuario": "admin",
      "password": "admin"
    },
    {
      "usuario": "test@mail.com",
      "password": "1234"
    }
  ]

  getUsuario(usuarioId:string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}`).pipe(map( (res:any) => {return res.data}));
  }

  getUsuarios(){
    return this.http.get(`${this.URL_COMPLETA}/usuario/`).pipe(map( (res:any) => {return res.data}));
  }

  insertUsuario(usuario:Usuario){
    return this.http.post(`${this.URL_COMPLETA}/usuario/`, usuario).pipe(map( (res:any) => {return res.data}));
  }

  updateUsuario(usuario:Usuario){
    return this.http.patch(`${this.URL_COMPLETA}/usuario/${usuario.id}`, usuario).pipe(map( (res:any) => {return res.data}));
  }

  deleteUsuario(usuarioId:string){
    return this.http.delete(`${this.URL_COMPLETA}/usuario/${usuarioId}`).pipe(map( (res:any) => {return res.data}));
  }

  // Gestiones

  setNotificacionToken(usuarioId:string, token:string) {
    const aux = {
      id: usuarioId,
      token: token
    }
    return this.http.post(`${this.URL_COMPLETA}/usuario/${usuarioId}/setNotificacionToken`, aux).pipe(map( (res:any) => {return res.data}));
  }

  iniciarSesion(mail:string, password:string) {
    return this.http.post(`${this.URL_COMPLETA}/usuario/iniciarsesion`, { mail: mail, password:password }).pipe(map( (res:any) => {return res.data}));
  }

  cerrarSesion() {
    this.storageService.remove(StorageKeys.TOKEN);
  }

  async getUsuarioLoggeado(){
    let token = await this.storageService.get(StorageKeys.TOKEN);
    if (token){
      let aux = jwtDecode(token) as any;
      return aux.usuarioId;
    }
    return undefined;
  }


  cambiarCotrasena(usuarioId:string, password:string, mail:string) {
    return this.http.patch(`${this.URL_COMPLETA}/usuario/${usuarioId}/cambiarContrasena?mail=${mail}`, { id: usuarioId, password:password, mail: mail }).pipe(map( (res:any) => {return res.data}));
  }
  getUsuarioPreferencias(usuarioId: string){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}/preferencias`).pipe(map( (res:any) => res.data ));
  }
  setDelUsuarioPreferencias(usuarioId: string, preferencia: UsuarioPreferencia){
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}/preferencias/${preferencia.clave}`).pipe(map( (res:any) => res.data ));
  }
  forgotPassword(mail:string) {
    mail = mail.replace('@', "%40");
    return this.http.get(`${this.URL_COMPLETA}/usuario/forgotPassword?mail=${mail}`).pipe(map( (res:any) => {return res.data}));
  }
  verificarCodigoPassword(mail:string, code:string) {
    mail = mail.replace('@', "%40");
    return this.http.post(`${this.URL_COMPLETA}/usuario/forgotPassword/verifyCode`, { mail: mail, code:code }).pipe(map( (res:any) => {return res.data}));
  }

}
