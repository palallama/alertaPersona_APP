import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Marcador, Ubicacion } from 'src/app/interfaz/marcador';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';
@Component({
  selector: 'app-post-emitir',
  templateUrl: './post-emitir.page.html',
  styleUrls: ['./post-emitir.page.scss'],
})
export class PostEmitirPage implements OnInit{
  private router = inject(Router);
  private locService = inject(LocalizacionService);

  mostrarMapa = false;

  center : Ubicacion = {
    latitud: 0,
    longitud: 0
  }
  emisor: Marcador = {
    position: {
      latitud: 0,
      longitud: 0
    },
    title: "Emisor",
    icon: "./assets/icons/icons_maps/icon_emis.png"
  }

  // asistentes: Marcador[] = [
  //   {
  //     position: {
  //       latitud: -34.6044089734555,
  //       lng: -58.39605072988798
  //     },
  //     title: "Asistente 1",
  //     icon: "./assets/icons/icons_maps/icon_asis.png"
  //   }
  // ]

  marcadores: Marcador[] = [];

  async ngOnInit() {
    // this.asistentes.map( (asis:Marcador) => {
      //   this.marcadores.push(asis);
      // })
    await this.setLocalizacion();
    this.marcadores.push(this.emisor);
  }

  async setLocalizacion(){
    let ubicacion = await this.locService.obtenerLocalizacion();
    this.center.longitud = ubicacion.longitude;
    this.center.latitud = ubicacion.latitude;
    this.emisor.position = this.center;
    this.mostrarMapa = true;
  }

  resuelto(){
    this.router.navigateByUrl('/home')
  }

}
