import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Ubicacion } from '../interfaz/marcador';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  async obtenerLocalizacion(){
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  calcularDistancia(ori:Ubicacion, des:Ubicacion) {
    return google.maps.geometry.spherical.computeDistanceBetween(ori, des);
  }

}
