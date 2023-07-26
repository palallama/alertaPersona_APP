import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  iniciarSesion(usuario:string, password:string) {
    let existe = false;
    this.credenciales.map( (crd) => {
      if (crd.usuario === usuario && crd.password === password) {
        existe = true;
      }
    })
    return existe;
  }
}
