import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';
import { StorageKeys } from 'src/app/interfaz/storage';
import { StorageService } from 'src/app/servicio/storage.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewWillEnter, OnInit{

  private usuarioService = inject(UsuarioService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  usuario = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(){
    this.resetForm()
    this.checkUsuario()
  }
  ionViewWillEnter() {
    this.resetForm()
    this.checkUsuario()
  }

  resetForm(){
    this.usuario.reset({mail: "", password: ""})
  }
  async checkUsuario(){
    if ( await this.usuarioService.getUsuarioLoggeado() !== undefined ){
      this.router.navigateByUrl("/")
    }
  }

  async enter(){

    if (this.usuario.valid){
      // console.log(this.usuario.value.mail);
      // console.log(this.usuario.value.password);
      
      this.usuarioService.iniciarSesion(this.usuario.value.mail!, this.usuario.value.password!).subscribe({
        next: (res:any) => {
          this.storageService.set(StorageKeys.TOKEN, res.data.token);
          this.router.navigateByUrl("/");
        },
        error: (error:any) => {
          console.log(error)
        }
      })

    }
  }



}
