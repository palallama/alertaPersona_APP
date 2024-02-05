import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/servicio/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private router = inject(Router);
  private timer = inject(TimerService);

  asistirAlerta() {
    let alertaRandom:number = 11 + (Math.floor(Math.random() * 6));
    this.router.navigateByUrl('/asistir/'+alertaRandom)
  }

}
