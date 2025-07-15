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
    return this.http.patch(`${this.URL_COMPLETA}/alerta/${alertaId}/cerrar`, {id: alertaId, estado: estado});
  }

}
