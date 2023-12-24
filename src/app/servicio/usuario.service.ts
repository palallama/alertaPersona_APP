import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaz/usuario';
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
  private URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

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
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuarioId}`);
  }

  getUsuarios(){
    return this.http.get(`${this.URL_COMPLETA}/usuario/`);
  }

  insertUsuario(usuario:Usuario){
    return this.http.post(`${this.URL_COMPLETA}/usuario/`, usuario);
  }

  updateUsuario(usuario:Usuario){
    return this.http.patch(`${this.URL_COMPLETA}/usuario/${usuario.id}`, usuario);
  }

  deleteUsuario(usuarioId:string){
    return this.http.delete(`${this.URL_COMPLETA}/usuario/${usuarioId}`);
  }

  // Gestiones

  iniciarSesion(mail:string, password:string) {
    return this.http.get(`${this.URL_COMPLETA}/usuario/iniciarsesion?mail=${mail}&password=${password}`);
    // this.http.get(`${this.URL_COMPLETA}/usuario/iniciarsesion?mail=${mail}&password=${password}`).subscribe({
    //   next: (res:any) => {
    //     console.log(res);
    //     let aux = jwtDecode(res.data.token) as any;
    //     this.storageService.set(StorageKeys.TOKEN, res.data.token);
    //     this.storageService.set(StorageKeys.USUARIO_ID, aux.id);
    //     return true;
    //   },
    //   error: (err:any) => {
    //     console.log(err)
    //     return false;
    //   }
    // })
  }

  cerrarSesion() {
    this.storageService.remove(StorageKeys.TOKEN);
  }

  async getUsuarioLoggeado(){
    let token = await this.storageService.get(StorageKeys.TOKEN);
    if (token){
      let aux = jwtDecode(token) as any;
      return aux.id;
    }
    return undefined;
  }

  async validarUsuario() {

  }




  // iniciarSesion(mail:string, password:string) {
  //   return this.http.get(`${this.URL_COMPLETA}/usuario/iniciarsesion?mail=${mail}&password=${password}`).pipe(
  //     map( (res:any) => {
  //       if (res.error){
  //         console.error(res.error)
  //       }else{
  //         let aux = jwtDecode(res.data.token) as any;
  //         this.storageService.set(StorageKeys.TOKEN, res.data.token);
  //         this.storageService.set(StorageKeys.USUARIO_ID, aux.id);
  //         return res.data.token;
  //       }
  //     } )
  //   );
  // }

  // iniciarSesion(usuario:string, password:string) {
  //   let existe = false;
  //   this.credenciales.map( (crd) => {
  //     if (crd.usuario === usuario && crd.password === password) {
  //       existe = true;
  //     }
  //   })
  //   return existe;
  // }
}
