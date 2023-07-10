import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  usuario = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  enter(){
    console.log(this.usuario.value.mail);
    console.log(this.usuario.value.password);

    // if (this.usuarioService.iniciarSesion(this.usuario.value.mail, this.usuario.value.password)) {
    //   this.router.navigateByUrl("/");
    // }
  }



}
