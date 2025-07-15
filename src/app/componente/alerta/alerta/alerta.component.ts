import { Component, OnInit } from '@angular/core';
import { AlertaBaseComponent } from '../alerta-base/alerta-base.component';
import { ComponenteModule } from "../../componente.module";
import { IonButton, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent extends AlertaBaseComponent {}
