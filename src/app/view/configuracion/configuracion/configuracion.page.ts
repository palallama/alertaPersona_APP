import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/interfaz/storage';
import { PreferenciasData, UsuarioPreferencia } from 'src/app/interfaz/usuario';
import { StorageService } from 'src/app/servicio/storage.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  private usuarioService = inject(UsuarioService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  cambioOk!: boolean;
  
  usuarioPreferencias!: UsuarioPreferencia[];
  preferencias: UsuarioPreferencia[] = PreferenciasData;

  usuario!:any;

  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuarioLoggeado();
    this.identificarUsuario();
    this.cambioOk = this.router.parseUrl(this.router.url).queryParams['data'];
  }

  
  async identificarUsuario(){
    this.usuarioService.getUsuarioPreferencias(this.usuario.id).subscribe({
      next: (res:any) => {
        this.preferencias.map( (p) => {
          res.map( (r:any) => {
            if (p.clave === r.clave){
              p.activo = true;
            }
          })
        })
      }
    });
  }

  actualizarPreferencia(preferencia:UsuarioPreferencia) {
    this.usuarioService.setDelUsuarioPreferencias(this.usuario.id, preferencia).subscribe({
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  cerrarSesion(){
    this.storageService.remove(StorageKeys.TOKEN_NOTIFICACION);
    this.usuarioService.cerrarSesion();
    this.router.navigateByUrl("/login");
  }

}
