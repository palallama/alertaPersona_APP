import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Alerta, AlertaEstado } from '../interfaz/alerta';
import { environment } from 'src/environments/environment';
import { interval, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private http = inject(HttpClient);

  private API_BASEURL = environment.API_BASEURL;
  private API_PORT = environment.API_PORT;
  private API_VERSION = environment.API_VERSION;
  private URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;

  alertas : Alerta[] = [
    {
      id: "1",
      usuario: "1",
      emision: new Date(2023, 10, 8),
      estado: AlertaEstado.EMITIDA,
      ubicacion: {
        latitud: -34.600236911265256, 
        longitud: -58.5938945644183
      }
    },
    {
      id: "2",
      usuario: "1",
      emision: new Date(2023, 9, 8),
      estado: AlertaEstado.EMITIDA,
      ubicacion: {
        latitud: -34.60015953787479, 
        longitud: -58.59244226625373
      }
    },
    {
      id: "3",
      usuario: "3",
      emision: new Date(2023, 10, 6),
      estado: AlertaEstado.CANCELADA,
      ubicacion: {
        latitud: -34.58904769918462,
        longitud: -58.59828565213417
      }
    },
    {
      id: "4",
      usuario: "2",
      emision: new Date(2023, 10, 10),
      estado: AlertaEstado.EMITIDA,
      ubicacion: {
        latitud: -34.59568407255823,
        longitud: -58.58746157478045
      }
    }
  ]
  
  getAlerta(alertaId:any){
    return this.http.get(`${this.URL_COMPLETA}/alerta/${alertaId}`);
  }

  getAlertas(){
    return this.http.get(`${this.URL_COMPLETA}/alerta/`);
  }

  insertAlerta(alerta:any){
    return this.http.post(`${this.URL_COMPLETA}/alerta/`, alerta);
  }

  updateAlerta(alerta:any){
    return this.http.patch(`${this.URL_COMPLETA}/alerta/`, alerta);
  }

  deleteAlerta(alertaId:any){
    return this.http.delete(`${this.URL_COMPLETA}/alerta/${alertaId}`);
  }

  getAlertaPeriodica(alertaId:string, miliseg:number = 5000) {
    return interval(miliseg).pipe(
      switchMap(() => this.http.get(`${this.URL_COMPLETA}/alerta/${alertaId}`))
    )
  }

  // 

  cerrarAlerta(alertaId:any, estado:string){
    return this.http.post(`${this.URL_COMPLETA}/alerta/cierre`, { id: alertaId, estado: estado});
  }

  async getAlertaTest(id:string) : Promise<Alerta>{
    let a:Alerta;
    this.alertas.map( (alerta) => {
      if (alerta.id === id) {
        a = alerta;
      }
    })
    return a!;
  }

}
