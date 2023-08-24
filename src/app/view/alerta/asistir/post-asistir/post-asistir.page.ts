import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ruta } from 'src/app/interfaz/ruta';
import { Ubicacion } from 'src/app/interfaz/marcador';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';


@Component({
    selector: 'app-post-asistir',
    templateUrl: './post-asistir.page.html',
    styleUrls: ['./post-asistir.page.scss'],
})
export class PostAsistirPage implements OnInit {
    private router = inject(Router);
    private locService = inject(LocalizacionService);
    
    mostrarMapa = false;

    ruta: Ruta = {
        origen: {
            lat: 0,
            lng: 0
        },
        destino: {
            lat: -34.60089567266922,
            lng: -58.38352310888356
        }
    }

    async ngOnInit() {
        await this.setLocalizacion();
    }
    
    async setLocalizacion(){
        let ubicacion = await this.locService.obtenerLocalizacion();
        this.ruta.origen.lat = ubicacion.latitude;
        this.ruta.origen.lng = ubicacion.longitude;
        this.mostrarMapa = true;
    }
    


    resuelto(){
        this.router.navigateByUrl('/home');
    }


}
