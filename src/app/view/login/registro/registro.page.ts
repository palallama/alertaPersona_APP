import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaz/usuario';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);


  usuario!: Usuario;
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
    console.log(this.usuarioNuevo);
    console.log(this.usuarioNuevo.valid);
    console.log(this.usuarioNuevo.value.password);
    console.log(this.usuarioNuevo.value.passwordRepetida);
    if (this.usuarioNuevo.valid && (this.usuarioNuevo.value.password === this.usuarioNuevo.value.passwordRepetida)){
      console.log(" *** Registrado");

      this.usuario = {
        nombre: this.usuarioNuevo.value.nombre!,
        apellido: this.usuarioNuevo.value.apellido!,
        dni: this.usuarioNuevo.value.dni!,
        telefono: this.usuarioNuevo.value.telefono!,
        nroTramite: this.usuarioNuevo.value.nroTramite!,
        mail: this.usuarioNuevo.value.mail!,
        password: this.usuarioNuevo.value.password!,
        genero: this.usuarioNuevo.value.nombre!,
        fchNacimiento: this.usuarioNuevo.value.fchNacimiento!,
      }

      this.usuarioService.insertUsuario(this.usuario).subscribe({
        next: (res:any) => {
          console.log(res);
          console.log("usuario registrado");
          this.router.navigateByUrl("/login");
        },
        error: (err:any) => {
          console.error(err);
        }
      })


    }else{
      console.log(this.usuarioNuevo.errors)
      console.log("*** Error");
    }
  }

}
