import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor() { }

  async obtenerLocalizacion(){
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

}
