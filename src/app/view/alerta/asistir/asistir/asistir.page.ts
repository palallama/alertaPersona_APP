import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta, AlertaEstado } from 'src/app/interfaz/alerta';
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
    latitud: 0,
    longitud: 0
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
          latitud: this.alerta.ubicacion?.latitud!,
          longitud: this.alerta.ubicacion?.longitud!
        },
        title: "Alerta",
        icon: "./assets/icons/icons_maps/icon_emis.png"
      });

      this.mostrarMapa = true;
    }
  }

  async buscarAlerta(id:any){
    this.alertaService.getAlerta(id).subscribe({
      next: (res:any) => {
        this.alerta = res
      },
      error: (res:any) => {
        console.error(res)
      },
      complete: () => {
        if(!this.alerta){
          this.alerta = {
            usuario: "1",
            emision: new Date(),
            estado: AlertaEstado.EMITIDA,
            ubicacion: {
              latitud: -34.60026581256884,
              longitud: -58.593906116244945
            }
          }
        }
      }
    })
  }

  async buscarAlertaTest(id:any){
      this.alerta = await this.alertaService.getAlertaTest(id);
      if(!this.alerta){
          this.alerta = {
              usuario: "1",
              emision: new Date(),
              estado: AlertaEstado.EMITIDA,
              ubicacion: {
              latitud: -34.60026581256884,
              longitud: -58.593906116244945
              }
          }
      }
  }

  async setLocalizacion(){
    let ubicacion = await this.locService.obtenerLocalizacion();
    this.ubicacionPropia.longitud = ubicacion.longitude;
    this.ubicacionPropia.latitud = ubicacion.latitude;
  }

}
