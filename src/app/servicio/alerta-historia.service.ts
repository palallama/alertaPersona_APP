import { Injectable, inject } from '@angular/core';
import { Alerta, AlertaEstado } from '../interfaz/alerta';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaHistoriaService {
  private http = inject(HttpClient);

  private API_BASEURL = environment.API_BASEURL;
  private API_PORT = environment.API_PORT;
  private API_VERSION = environment.API_VERSION;
  private URL_COMPLETA = (this.API_PORT!='') ? `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}` : `${this.API_BASEURL}/${this.API_VERSION}`;

  emitidas : Alerta[] = [
    {
      id: "ale1",
      usuario: "julian@mail.com",
      emision: new Date("2023/06/20"),
      estado: AlertaEstado.SOLUCIONADA
    },
    {
      id: "ale2",
      usuario: "julian@mail.com",
      emision: new Date("2023/07/16"),
      estado: AlertaEstado.CANCELADA
    }
  ]

  asistidas : Alerta[] = [
    {
      id: "ale3",
      usuario: "julian@mail.com",
      emision: new Date("2023/06/20"),
      estado: AlertaEstado.SOLUCIONADA
    },    
    {
      id: "ale4",
      usuario: "julian@mail.com",
      emision: new Date("2023/07/16"),
      estado: AlertaEstado.CANCELADA
    },    
    {
      id: "ale5",
      usuario: "mail@mail.com",
      emision: new Date("2023/07/18"),
      estado: AlertaEstado.CANCELADA
    },
    {
      id: "ale6",
      usuario: "julian@mail.com",
      emision: new Date("2023/08/10"),
      estado: AlertaEstado.SOLUCIONADA
    }
  ]

  getHistorialUsuario(usuario:string) {
    return this.http.get(`${this.URL_COMPLETA}/usuario/${usuario}/historial`).pipe(map( (res:any) => {return res.data}));
  }

}