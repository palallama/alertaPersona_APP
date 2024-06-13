import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-recupero-mail',
  templateUrl: './recupero-mail.page.html',
  styleUrls: ['./recupero-mail.page.scss'],
})
export class RecuperoMailPage {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  mail = new FormControl("", [ Validators.required, Validators.email ]);

  enter() {

    if ( this.mail.valid ) {
      console.log(this.mail.value);

      this.usuarioService.forgotPassword(this.mail.value!).subscribe({
        complete: () => {
          this.router.navigateByUrl(`recupero-password?mail=${this.mail.value!}`)
        }
      })
      
    }

  }

}
