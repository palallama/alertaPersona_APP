import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruta } from 'src/app/interfaz/marcador';
import { Ubicacion } from 'src/app/interfaz/marcador';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';
import { Alerta, AlertaEstado } from 'src/app/interfaz/alerta';
import { AlertaService } from 'src/app/servicio/alerta.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';
import { interval, switchMap, tap } from 'rxjs';


@Component({
    selector: 'app-post-asistir',
    templateUrl: './post-asistir.page.html',
    styleUrls: ['./post-asistir.page.scss'],
})
export class PostAsistirPage implements OnInit, OnDestroy {
    private router = inject(Router);
    private rutaActiva = inject(ActivatedRoute);
    private locService = inject(LocalizacionService);
    private usuarioService = inject(UsuarioService);

    private alertaService = inject(AlertaService);
    
    usuarioId: any;

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
        this.usuarioId = await this.usuarioService.getUsuarioLoggeado();
        this.alertaId = this.rutaActiva.snapshot.params['alerta'];

        this.buscarAlerta(this.alertaId);
        console.log("antes de localizacion")
        await this.setLocalizacion();

        // if (this.alerta){
        //     this.ruta.destino = this.alerta.ubicacion!;
        //     this.mostrarMapa = true;
        // }
        console.log("fin ngOnInit");
    }

    ngOnDestroy(): void {
        
    }
    
    async setLocalizacion(){
        let ubicacion = await this.locService.obtenerLocalizacion();
        this.ruta.origen.latitud = ubicacion.latitude;
        this.ruta.origen.longitud = ubicacion.longitude;
    }

    async buscarAlerta(id:any){
        let primerBusqueda = true;
        this.alertaService.getAlertaPeriodica(id).subscribe({
            next: (res:any) => {
                this.alerta = res;

                if (this.alerta && primerBusqueda){
                    this.ruta.destino = this.alerta.ubicacion!;
                    this.mostrarMapa = true;
                    primerBusqueda = false;
                }
                if (this.alerta.cerrada) {
                    alert("Se cerro la alerta, gracias por tu ayuda");
                    this.resuelto()
                }
            },
            error: (res:any) => {
                console.error(res);
            },
            complete: () => {
                console.log(this.alerta)
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
