import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/interfaz/ruta';

@Component({
    selector: 'app-post-asistir',
    templateUrl: './post-asistir.page.html',
    styleUrls: ['./post-asistir.page.scss'],
})
export class PostAsistirPage {

    ruta: Ruta = {
        origen: {
            lat: -34.41568791269847,
            lng: -58.72478483924493
        },
        destino: {
            lat: -34.418052321592924, 
            lng: -58.725404960797704
        }
    }

}
