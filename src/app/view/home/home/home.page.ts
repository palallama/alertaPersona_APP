import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  private router = inject(Router);


  asistirAlerta() {

    let alertaRandom:number = 1 + (Math.floor(Math.random() * 4));
    this.router.navigateByUrl('/asistir/'+alertaRandom)
  }

}
