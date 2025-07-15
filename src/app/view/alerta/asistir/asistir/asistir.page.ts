import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alerta, AlertaEstado } from 'src/app/interfaz/alerta';
import { Marcador, Ubicacion } from 'src/app/interfaz/marcador';
import { AlertaService } from 'src/app/servicio/alerta.service';
import { AsistenteService } from 'src/app/servicio/asistente.service';
import { LocalizacionService } from 'src/app/servicio/localizacion.service';
import { UsuarioService } from 'src/app/servicio/usuario.service';

@Component({
  selector: 'app-asistir',
  templateUrl: './asistir.page.html',
  styleUrls: ['./asistir.page.scss'],
})
export class AsistirPage implements OnInit {
  private locService = inject(LocalizacionService);
  private rutaActiva = inject(ActivatedRoute);
  private alertaService = inject(AlertaService);
  private usuarioService = inject(UsuarioService);
  private asistenteService = inject(AsistenteService);
  private alertController = inject(AlertController);
  private router = inject(Router);
  
  usuarioId: any;

  mostrarMapa = false;
  alertaId!:string;
  alerta!: Alerta | null;

  distancia: number = 0;

  ubicacionPropia : Ubicacion = {
    latitud: 0,
    longitud: 0
  }

  marcadores: Marcador[] = [];

  async ngOnInit() {
    this.usuarioId = (await this.usuarioService.getUsuarioLoggeado())!.id;
    this.alertaId = this.rutaActiva.snapshot.params['alerta'];
    // console.log(this.alertaId); 

    // this.refresh()
    this.buscarAlerta(this.alertaId);
  }

  async seteos() {

    await this.setLocalizacion();
    
    if (this.alerta){
      this.distancia = await this.locService.calcularDistancia(this.ubicacionPropia, this.alerta?.ubicacion!);
      this.marcadores.push({
        position: {
          latitud: this.alerta.ubicacion?.latitud!,
          longitud: this.alerta.ubicacion?.longitud!
        },
        title: "Alerta",
        icon: "./assets/icons/icons_maps/icon_emis.png"
      });
      this.mostrarMapa = true;
    }
  }
  async buscarAlerta(id:any){
    this.alertaService.getAlerta(id).subscribe({
      next: (res:any) => {
        // console.log(res);
        this.alerta = res;

        if (this.alerta?.cerrada){
          this.alertaCerrada();
        }
      },
      error: (res:any) => {
        console.error(res)
      },
      complete: () => {
        this.seteos();
      }
    })
  }

  async setLocalizacion(){
    let ubicacion = await this.locService.obtenerLocalizacion();
    this.ubicacionPropia.longitud = ubicacion.longitude;
    this.ubicacionPropia.latitud = ubicacion.latitude;
  }

  async accionAsistente(accion:string) {
    // si la alerta esta cerrada, expiro. no se puede asistir ni rechazar
    if (this.alerta?.cerrada){
      return
    }

    const asistente = {
      alertaId: Number(this.alertaId),
      usuarioId: Number(this.usuarioId),
      estado: accion,
      observacion: ""
    }

    console.log(asistente);

    this.asistenteService.insertAsistente(asistente).subscribe({
      next: (res: any) => {
        console.log(res);
        if (accion === 'A') {
          this.router.navigateByUrl(`/post-asistir/${this.alertaId}`)
        }else{
          this.router.navigateByUrl(`/home`)
        }
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  async alertaCerrada() {  
    const alert = await this.alertController.create({
      header: 'Alerta expirada',
      // subHeader: 'A Sub Header Is Optional',
      message: 'La Alerta a la que quiere acudir ah expirado.\nGracias por su ayuda',
      buttons: [{
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {
          this.router.navigateByUrl(`/home`)
        },
      }],
    });

    await alert.present();
  }

}
