import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Marcador } from 'src/app/interfaz/marcador';
@Component({
  selector: 'app-post-emitir',
  templateUrl: './post-emitir.page.html',
  styleUrls: ['./post-emitir.page.scss'],
})
export class PostEmitirPage implements OnInit{
  private router = inject(Router);

  emisor: Marcador = {
    position: {
      lat: -34.60089567266922,
      lng: -58.38352310888356
    },
    title: "Emisor",
    icon: "./assets/icons/icons_maps/icon_emis.png"
  }

  asistentes: Marcador[] = [
    {
      position: {
        lat: -34.6044089734555,
        lng: -58.39605072988798
      },
      title: "Asistente 1",
      icon: "./assets/icons/icons_maps/icon_asis.png"
    }
  ]

  marcadores: Marcador[] = [];

  ngOnInit(): void {
    this.marcadores.push(this.emisor);
    this.asistentes.map( (asis:Marcador) => {
      this.marcadores.push(asis);
    })
  }

  resuelto(){
    this.router.navigateByUrl('/home')
  }

}
