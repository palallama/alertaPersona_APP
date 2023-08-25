import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {

  @ViewChild('botonSwapUp') footer!: ElementRef;
  private gestureCtrl = inject(GestureController)
  private router = inject(Router);
  private zone = inject(NgZone);

  deltaMin: number = 250;

  ngAfterViewInit() {

    // console.log(this.footer.nativeElement);
    const gesture = this.gestureCtrl.create({
      el: this.footer.nativeElement,
      direction: 'y',
      threshold: 15,
      gestureName: 'emitirAlertaGesture',
      onMove: ev => this.onMove(ev),
      onEnd: ev => this.onEnd(ev)
    })
  
    gesture.enable();
  }

  private onMove(detail:any) {
    let aux = {
      type: detail.type,
      from: detail.startY,
      current: detail.currentY,
      delta: detail.deltaY,
    }
    // console.log(aux);
    let deltaNomalizada = aux.delta * (-1)
    if (deltaNomalizada >= this.deltaMin){
      this.emitirAlerta()
    }
  }

  private onEnd(detail:any) {
    let aux = {
      type: detail.type,
      from: detail.startY,
      current: detail.currentY,
      delta: detail.deltaY,
    }
    // console.log(aux);
    let deltaNomalizada = aux.delta * (-1)
    if (deltaNomalizada >= this.deltaMin){
      this.emitirAlerta()
    }
  }

  emitirAlerta() {
    console.log("**** ALERTA EMITIDA ****");
    this.zone.run(() => {
      this.router.navigate(['/post-emitir']);
    });
  }

}
