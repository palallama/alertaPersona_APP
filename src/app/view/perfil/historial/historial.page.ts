import { Component, OnInit, inject } from '@angular/core';
import { Alerta } from 'src/app/interfaz/alerta';
import { AlertaHistoriaService } from 'src/app/servicio/alerta-historia.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  private alertaHistoriaService = inject(AlertaHistoriaService)

  alertasEmitidas!: Alerta[];
  alertasAsistidas!: Alerta[];

  ngOnInit() {

    this.alertasAsistidas = this.alertaHistoriaService.getHistorialAsistidas('julian@mail.com');

    this.alertasEmitidas = this.alertaHistoriaService.getHistorialEmitidas('julian@mail.com');

  }

}
