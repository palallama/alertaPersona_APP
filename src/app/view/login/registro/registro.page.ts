import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaz/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  usuario!: Usuario;

  test!: string;

  usuarioNuevo = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    dni: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    nroTramite: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    genero: new FormControl('', [Validators.required]),
    fchNacimiento: new FormControl(null, [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordRepetida: new FormControl('', [Validators.required]),
  });

  registro() {

    console.log(this.usuarioNuevo.get('nombre')?.errors);

    console.log(this.usuarioNuevo.get('dni')?.errors);


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
