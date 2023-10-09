import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruta } from 'src/app/interfaz/ruta';
import { Ubicacion } from 'src/app/interfaz/marcador';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';
import { Alerta } from 'src/app/interfaz/alerta';
import { AlertaEstado } from 'src/app/interfaz/alerta-estado';
import { AlertaService } from 'src/app/servicio/alerta.service';


@Component({
    selector: 'app-post-asistir',
    templateUrl: './post-asistir.page.html',
    styleUrls: ['./post-asistir.page.scss'],
})
export class PostAsistirPage implements OnInit {
    private router = inject(Router);
    private rutaActiva = inject(ActivatedRoute);
    private locService = inject(LocalizacionService);
    private alertaService = inject(AlertaService);
    
    alertaId!: string;
    mostrarMapa = false;

    alerta!: Alerta;

    ruta: Ruta = {
        origen: {
            lat: 0,
            lng: 0
        },
        destino: {
            lat: 0,
            lng: 0
        }
    }

    async ngOnInit() {
        this.alertaId = this.rutaActiva.snapshot.params['alerta'];

        await this.buscarAlerta(this.alertaId);
        await this.setLocalizacion();

        if (this.alerta){
            this.ruta.destino = this.alerta.ubicacion!;
            this.mostrarMapa = true;
        }
    }
    
    async setLocalizacion(){
        let ubicacion = await this.locService.obtenerLocalizacion();
        this.ruta.origen.lat = ubicacion.latitude;
        this.ruta.origen.lng = ubicacion.longitude;
    }

    async buscarAlerta(id:any){
        this.alerta = await this.alertaService.getAlerta(id);
        if(!this.alerta){
            this.alerta = {
            usuario: "1",
            fecha: new Date(),
            estado: AlertaEstado.PENDIENTE,
            ubicacion: {
                lat: -34.60026581256884,
                lng: -58.593906116244945
            }
            }
        }
    }

    resuelto(){
        this.router.navigateByUrl('/home');
    }


}
