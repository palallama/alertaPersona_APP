import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/interfaz/alerta';
import { AlertaEstado } from 'src/app/interfaz/alerta-estado';
import { Marcador, Ubicacion } from 'src/app/interfaz/marcador';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';

@Component({
  selector: 'app-asistir',
  templateUrl: './asistir.page.html',
  styleUrls: ['./asistir.page.scss'],
})
export class AsistirPage implements OnInit {
  private locService = inject(LocalizacionService);
  private rutaActiva = inject(ActivatedRoute);
  
  mostrarMapa = false;
  alertaId!:number;
  alerta!: Alerta;

  distancia: number = 0;

  ubicacionPropia : Ubicacion = {
    lat: 0,
    lng: 0
  }

  marcadores: Marcador[] = [];

  async ngOnInit() {
    this.alertaId = this.rutaActiva.snapshot.params['alerta'];
    console.log(this.alertaId);

    await this.buscarAlerta(this.alertaId);
    await this.setLocalizacion();
    this.distancia = this.calcularDistancia();

    if (this.alerta){
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

  async setLocalizacion(){
    let ubicacion = await this.locService.obtenerLocalizacion();
    this.ubicacionPropia.lng = ubicacion.longitude;
    this.ubicacionPropia.lat = ubicacion.latitude;
  }

  calcularDistancia() {
    let gps1 = new google.maps.LatLng(this.ubicacionPropia.lat, this.ubicacionPropia.lng);
    let gps2 = new google.maps.LatLng(this.alerta.ubicacion?.lat!, this.alerta.ubicacion?.lng!);
    return google.maps.geometry.spherical.computeDistanceBetween(gps1, gps2);
  }

}
