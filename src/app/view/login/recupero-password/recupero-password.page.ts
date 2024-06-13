import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageKeys } from 'src/app/interfaz/storage';
import { StorageService } from 'src/app/servicio/storage.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-recupero-password',
  templateUrl: './recupero-password.page.html',
  styleUrls: ['./recupero-password.page.scss'],
})
export class RecuperoPasswordPage implements OnInit{
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private storageService = inject(StorageService);

  mail!:string;

  primer:string  = '';
  segundo:string = '';
  tercero:string = '';
  cuarto:string  = '';
  quinto:string  = '';
  sexto:string   = '';

  ngOnInit(): void {
    this.mail = this.router.parseUrl(this.router.url).queryParams['mail'];
  }

  keyPress(e:any, to:string){
    // console.log(to)
    const key = e.which || e.keyCode;

    // Si la tecla pulsada es un numero - 48 -> 57 | 96 -> 105
    if((key>=48 && key<=57) || (key>=96 && key<=105)){
      window.setTimeout(function() {
        document.getElementById(to)?.focus();
      }, 0);
    }

    // si la tecla es backspace
    // if (key === 8){
    //   // si se preciono y no hay ningun caracter
    //   if( e.srcElement.value.length < 1){
    //     window.setTimeout(function() {
    //       document.getElementById(e.srcElement.dataset.prev)?.focus();
    //     }, 0);
    //   }
    // }


  }

  async enter() {

    let codigo = `${this.primer}${this.segundo}${this.tercero}${this.cuarto}${this.quinto}${this.sexto}`
    console.log(codigo)

    this.usuarioService.verificarCodigoPassword(this.mail, codigo).subscribe({
      error: (err:any) => {
        this.codigoErroneo();
      },
      complete: () => {
        this.storageService.set(StorageKeys.MAIL_RECUPERO, this.mail);
        this.router.navigateByUrl("/cambiar-password");
      },
    })

  }

  codigoErroneo(){
    console.log("codigo erroneo");
  }

  reeviar(){

  }
}
