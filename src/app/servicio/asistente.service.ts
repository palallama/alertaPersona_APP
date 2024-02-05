import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {
  private http = inject(HttpClient);

  private API_BASEURL = environment.API_BASEURL;
  private API_PORT = environment.API_PORT;
  private API_VERSION = environment.API_VERSION;
  private URL_COMPLETA = `${this.API_BASEURL}:${this.API_PORT}/${this.API_VERSION}`;
  
  getAsistente(asistenteId:any){
    return this.http.get(`${this.URL_COMPLETA}/asistente/${asistenteId}`);
  }

  getAsistentes(){
    return this.http.get(`${this.URL_COMPLETA}/asistente/`);
  }

  insertAsistente(asistente:any){
    return this.http.post(`${this.URL_COMPLETA}/asistente/`, asistente);
  }

  updateAsistente(asistente:any){
    return this.http.patch(`${this.URL_COMPLETA}/asistente/`, asistente);
  }

  deleteAsistente(asistenteId:any){
    return this.http.delete(`${this.URL_COMPLETA}/asistente/${asistenteId}`);
  }
}
