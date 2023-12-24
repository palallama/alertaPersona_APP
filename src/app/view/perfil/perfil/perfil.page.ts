import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from 'src/app/interfaz/usuario';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private usuarioService = inject(UsuarioService);
  usuario!: Usuario;

  async ngOnInit() {

    let usuLg = await this.usuarioService.getUsuarioLoggeado();
    if(usuLg){
      this.usuarioService.getUsuario(usuLg).subscribe({
        next: (res:any) => {
          console.log(res);
          this.usuario = res;
        },
        error: (err:any) => {
          console.error(err);
        }
      })
    }

    // let date = new Date();
    // this.usuario = {
    //   id: '0',
    //   nombre: "Julian",
    //   apellido: "Torossian",
    //   dni: 41751057,
    //   nroTramite: 0,
    //   genero: "Masculino",
    //   fchNacimiento: date,
    //   telefono: "2944-900241",
    //   mail: "julian.torossian@outlook.com",
    //   password: "",
    //   validado: true,
    //   activo: true
    // }

  }


}
