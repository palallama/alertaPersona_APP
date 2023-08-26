import { Injectable } from '@angular/core';
import { AlertaEstado } from '../interfaz/alerta-estado';
import { Alerta } from '../interfaz/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaHistoriaService {

  emitidas : Alerta[] = [
    {
      id: "ale1",
      usuario: "julian@mail.com",
      fecha: new Date("2023/06/20"),
      estado: AlertaEstado.SOLUCIONADA
    },
    {
      id: "ale2",
      usuario: "julian@mail.com",
      fecha: new Date("2023/07/16"),
      estado: AlertaEstado.CANCELADA
    }
  ]

  asistidas : Alerta[] = [
    {
      id: "ale3",
      usuario: "julian@mail.com",
      fecha: new Date("2023/06/20"),
      estado: AlertaEstado.SOLUCIONADA
    },    
    {
      id: "ale4",
      usuario: "julian@mail.com",
      fecha: new Date("2023/07/16"),
      estado: AlertaEstado.CANCELADA
    },    
    {
      id: "ale5",
      usuario: "mail@mail.com",
      fecha: new Date("2023/07/18"),
      estado: AlertaEstado.CANCELADA
    },
    {
      id: "ale6",
      usuario: "julian@mail.com",
      fecha: new Date("2023/08/10"),
      estado: AlertaEstado.SOLUCIONADA
    }
  ]


  getHistorialEmitidas(usuario:string) : Alerta[] {
    let aux: Alerta[] = [];
    this.emitidas.map( (e) => {
      if (e.usuario == usuario){
        aux.push(e);
      }
    });
    return aux;
  }

  getHistorialAsistidas(usuario:string) : Alerta[] {
    let aux: Alerta[] = [];
    this.asistidas.map( (e) => {
      if (e.usuario == usuario){
        aux.push(e);
      }
    });
    return aux;
  }

}