import { Component, Input, OnInit } from '@angular/core';
import { Alerta, AlertaEstado } from 'src/app/interfaz/alerta';

@Component({
  selector: 'app-item-historial',
  templateUrl: './item-historial.component.html',
  styleUrls: ['./item-historial.component.scss'],
})
export class ItemHistorialComponent {

  @Input() alerta: Alerta = {
    id: "ale1",
    usuario: "julian@mail.com",
    emision: new Date(2023, 8, 24),
    estado: AlertaEstado.EMITIDA
  };

}
