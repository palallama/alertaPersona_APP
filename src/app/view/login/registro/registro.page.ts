import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usuario } from 'src/app/interfaz/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  usuario!: usuario;

  usuarioNuevo = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    dni: new FormControl(0, [Validators.required]),
    nroTramite: new FormControl(0, [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    fchNacimiento: new FormControl(null, [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordRepetida: new FormControl('', [Validators.required]),
  });

  registro() {

    // console.log(this.usuarioNuevo);
    if (this.usuarioNuevo.valid && (this.usuarioNuevo.value.password === this.usuarioNuevo.value.passwordRepetida)){
      console.log(" *** Registrado");
      console.log(this.usuarioNuevo.value.nombre)
      console.log(this.usuarioNuevo.value.apellido)
      console.log(this.usuarioNuevo.value.dni)
      console.log(this.usuarioNuevo.value.mail)
      console.log(this.usuarioNuevo.value.password)
    }else{
      console.log("*** Error");
    }
  }

}
