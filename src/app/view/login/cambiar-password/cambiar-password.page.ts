import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/interfaz/storage';
import { StorageService } from 'src/app/servicio/storage.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {
  private storageService = inject(StorageService);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  origen: string = "";
  
  mailRecu!:string;
  password = new FormControl("", [ Validators.required ])
  repitePassword = new FormControl("", [ Validators.required ])
  oldPassword = new FormControl("", [ Validators.required ])

  async ngOnInit(){
    this.origen = this.router.parseUrl(this.router.url).queryParams['origen'];
    this.mailRecu = await this.storageService.get(StorageKeys.MAIL_RECUPERO);
    // console.log(this.origen);
  }

  async enter() {

    if ((this.password.valid && this.repitePassword.valid) && ((this.password.value === this.repitePassword.value)) ) {

      console.log(this.password.value);
      console.log(this.repitePassword.value);
      console.log(this.origen);
      
      if (this.origen === 'C'){
        if (this.oldPassword.valid) {
          if (this.password.value !== this.oldPassword.value) {
  
            this.usuarioService.cambiarCotrasena(this.password.value!, this.oldPassword.value! ).subscribe({
              error: (err:any) => {
                console.error(err);
                // this.router.navigateByUrl('/configuracion?ok=false');
              },
              complete: ()=>{
                this.router.navigateByUrl('/configuracion?ok=true');
              }
            })
          }

        }
      }else{
        this.usuarioService.resetearContrasena(this.mailRecu, this.password.value!).subscribe({
          error: (err:any) => {
            console.error(err);
          },
          complete: ()=>{
              this.router.navigateByUrl('/login');
          }
        })
      }
      

    }

  }

}
