import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ruta } from 'src/app/interfaz/ruta';

@Component({
    selector: 'app-post-asistir',
    templateUrl: './post-asistir.page.html',
    styleUrls: ['./post-asistir.page.scss'],
})
export class PostAsistirPage {
    private router = inject(Router);

    ruta: Ruta = {
        origen: {
            lat: -34.6044089734555,
            lng: -58.39605072988798
        },
        destino: {
            lat: -34.60089567266922,
            lng: -58.38352310888356
        }
    }

    resuelto(){
        this.router.navigateByUrl('/home')
    }

}
