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
  
  getHistorialUsuario(usuario:string) {
    return this.http.get(`${this.URL_COMPLETA}/usuario/historial-alertas/${usuario}`);
  }

}