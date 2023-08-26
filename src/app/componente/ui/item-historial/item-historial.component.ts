import { Component, Input, OnInit } from '@angular/core';
import { Alerta } from 'src/app/interfaz/alerta';
import { AlertaEstado } from 'src/app/interfaz/alerta-estado';

@Component({
  selector: 'app-item-historial',
  templateUrl: './item-historial.component.html',
  styleUrls: ['./item-historial.component.scss'],
})
export class ItemHistorialComponent {

  @Input() alerta: Alerta = {
    id: "ale1",
    usuario: "julian@mail.com",
    fecha: new Date(2023, 8, 24),
    estado: AlertaEstado.PENDIENTE
  };

}
