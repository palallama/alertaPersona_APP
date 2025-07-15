import { Component, OnInit, inject } from '@angular/core';
import { Alerta } from 'src/app/interfaz/alerta';
import { AlertaHistoriaService } from 'src/app/servicio/alerta-historia.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  private alertaHistoriaService = inject(AlertaHistoriaService);
  private usuarioService = inject(UsuarioService);

  usuario!:string;

  alertasEmitidas!: Alerta[];
  alertasAsistidas!: Alerta[];

  async ngOnInit() {
    this.usuario = (await this.usuarioService.getUsuarioLoggeado())!.id;
    this.getHistory();
  }

  getHistory() {
    // this.alertasAsistidas = this.alertaHistoriaService.getHistorialAsistidas('julian@mail.com');
    // this.alertasEmitidas = this.alertaHistoriaService.getHistorialEmitidas('julian@mail.com');

    this.alertaHistoriaService.getHistorialUsuario(this.usuario).subscribe({
      next: (res:any) => {
        this.alertasAsistidas = res.acudidas;
        this.alertasEmitidas  = res.emitidas;
      },
      error: (err:any) => {
        console.error(err);
      }
    })

  }

}
