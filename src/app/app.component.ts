import { Component, OnInit, inject } from '@angular/core';
import { NotificacionService } from './servicio/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private notificacionService = inject(NotificacionService);

  ngOnInit(): void {
    this.notificacionService.iniciarNotificaciones();
  }
}
