import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicio/usuario.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  cambioOk!: boolean;

  ngOnInit() {
    this.cambioOk = this.router.parseUrl(this.router.url).queryParams['data'];
    // console.log(this.cambioOk);
  }

  cerrarSesion(){
    this.usuarioService.cerrarSesion();
    this.router.navigateByUrl("/login");
  }

}
