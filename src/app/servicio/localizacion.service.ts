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

  async calcularDistancia(ori:Ubicacion, des:Ubicacion) {
    return google.maps.geometry.spherical.computeDistanceBetween({lat: ori.latitud, lng: ori.longitud}, {lat:des.latitud, lng:des.longitud});
  }

}
