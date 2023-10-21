import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruta } from 'src/app/interfaz/marcador';
import { Ubicacion } from 'src/app/interfaz/marcador';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';
import { Alerta, AlertaEstado } from 'src/app/interfaz/alerta';
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
            latitud: 0,
            longitud: 0
        },
        destino: {
            latitud: 0,
            longitud: 0
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
        this.ruta.origen.latitud = ubicacion.latitude;
        this.ruta.origen.longitud = ubicacion.longitude;
    }

    async buscarAlerta(id:any){

        this.alertaService.getAlerta(id).subscribe({
            next: (res:any) => {
                this.alerta = res;
            },
            error: (res:any) => {
                console.error(res);
            },
            complete: () => {
                if(!this.alerta){
                    this.alerta = {
                    usuario: "1",
                    emision: new Date(),
                    estado: AlertaEstado.EMITIDA,
                    ubicacion: {
                        latitud: -34.60026581256884,
                        longitud: -58.593906116244945
                    }
                    }
                }
            }
        })
    }

    async buscarAlertaTest(id:any){
        this.alerta = await this.alertaService.getAlertaTest(id);
        if(!this.alerta){
            this.alerta = {
                usuario: "1",
                emision: new Date(),
                estado: AlertaEstado.EMITIDA,
                ubicacion: {
                latitud: -34.60026581256884,
                longitud: -58.593906116244945
                }
            }
        }
    }

    resuelto(){
        this.router.navigateByUrl('/home');
    }


}
