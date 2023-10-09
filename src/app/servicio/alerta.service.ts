import { Injectable } from '@angular/core';
import { Alerta } from '../interfaz/alerta';
import { AlertaEstado } from '../interfaz/alerta-estado';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  alertas : Alerta[] = [
    {
      id: "1",
      usuario: "1",
      fecha: new Date(2023, 10, 8),
      estado: AlertaEstado.PENDIENTE,
      ubicacion: {
        lat: -34.600236911265256, 
        lng: -58.5938945644183
      }
    },
    {
      id: "2",
      usuario: "1",
      fecha: new Date(2023, 9, 8),
      estado: AlertaEstado.PENDIENTE,
      ubicacion: {
        lat: -34.60015953787479, 
        lng: -58.59244226625373
      }
    },
    {
      id: "3",
      usuario: "3",
      fecha: new Date(2023, 10, 6),
      estado: AlertaEstado.CANCELADA,
      ubicacion: {
        lat: -34.58904769918462,
        lng: -58.59828565213417
      }
    },
    {
      id: "4",
      usuario: "2",
      fecha: new Date(2023, 10, 10),
      estado: AlertaEstado.PENDIENTE,
      ubicacion: {
        lat: -34.59568407255823,
        lng: -58.58746157478045
      }
    }
  ]

  async getAlerta(id:string) : Promise<Alerta>{
    let a:Alerta;
    this.alertas.map( (alerta) => {
      if (alerta.id === id) {
        a = alerta;
      }
    })
    return a!;
  }

}
