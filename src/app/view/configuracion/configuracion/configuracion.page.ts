import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  private router = inject(Router);
  cambioOk!: boolean;

  ngOnInit() {
    this.cambioOk = this.router.parseUrl(this.router.url).queryParams['data'];
    console.log(this.cambioOk);
  }

}
