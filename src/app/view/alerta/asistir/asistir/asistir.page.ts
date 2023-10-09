import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/interfaz/alerta';
import { AlertaEstado } from 'src/app/interfaz/alerta-estado';
import { Marcador, Ubicacion } from 'src/app/interfaz/marcador';
import { AlertaService } from 'src/app/servicio/alerta.service';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';

@Component({
  selector: 'app-asistir',
  templateUrl: './asistir.page.html',
  styleUrls: ['./asistir.page.scss'],
})
export class AsistirPage implements OnInit {
  private locService = inject(LocalizacionService);
  private rutaActiva = inject(ActivatedRoute);
  private alertaService = inject(AlertaService);
  
  mostrarMapa = false;
  alertaId!:string;
  alerta!: Alerta | null;

  distancia: number = 0;

  ubicacionPropia : Ubicacion = {
    lat: 0,
    lng: 0
  }

  marcadores: Marcador[] = [];

  async ngOnInit() {
    this.alertaId = this.rutaActiva.snapshot.params['alerta'];
    // console.log(this.alertaId);

    await this.buscarAlerta(this.alertaId);
    await this.setLocalizacion();
    
    if (this.alerta){
      this.distancia = this.locService.calcularDistancia(this.ubicacionPropia, this.alerta?.ubicacion!);
      this.marcadores.push({
        position: {
          lat: this.alerta.ubicacion?.lat!,
          lng: this.alerta.ubicacion?.lng!
        },
        title: "Alerta",
        icon: "./assets/icons/icons_maps/icon_emis.png"
      });

      this.mostrarMapa = true;
    }
  }

  async buscarAlerta(id:any){
    this.alerta = await this.alertaService.getAlerta(id);
    if(!this.alerta){
      this.alerta = {
        usuario: "1",
        fecha: new Date(),
        estado: AlertaEstado.PENDIENTE,
        ubicacion: {
          lat: -34.60026581256884,
          lng: -58.593906116244945
        }
      }
    }
  }

  async setLocalizacion(){
    let ubicacion = await this.locService.obtenerLocalizacion();
    this.ubicacionPropia.lng = ubicacion.longitude;
    this.ubicacionPropia.lat = ubicacion.latitude;
  }

}
