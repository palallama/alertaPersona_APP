import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  usuario = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required])
  });

  async ngOnInit() {
    this.usuario.setValue({mail: "", password: ""})
    console.log("usuario - ", await this.usuarioService.getUsuarioLoggeado());
    if ( await this.usuarioService.getUsuarioLoggeado() !== undefined){
      this.router.navigateByUrl("/home")
    }
  }

  enter(){

    if (this.usuario.valid){
      console.log(this.usuario.value.mail);
      console.log(this.usuario.value.password);
      
      this.usuarioService.iniciarSesion(this.usuario.value.mail!, this.usuario.value.password!).subscribe({
        next: (res:any) => {
          if (res!=""){
            console.log(jwtDecode(res));
            // this.router.navigateByUrl("/"); 
          }
        },
        error: (err:any) => {
          console.log(err);
        }
      })

      // if (this.usuarioService.iniciarSesion(this.usuario.value.mail! , this.usuario.value.password! )) {
      //   this.router.navigateByUrl("/");
      // }
    }
  }



}
