import { AfterViewInit, Component, ElementRef, inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Gesture, GestureController } from '@ionic/angular';

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

  deltaMin: number = 300;
  deltaMinOnMove: number = 550;
  gesture!: Gesture;

  ngAfterViewInit() {
    this.crearGesto()
  }

  crearGesto() {
    this.footer.nativeElement.style.transform = `translateY(0px)` 
    this.gesture = this.gestureCtrl.create({
      el: this.footer.nativeElement,
      direction: 'y',
      threshold: 15,
      gestureName: 'emitirAlertaGesture',
      onMove: ev => this.onMove(ev),
      onEnd: ev => this.onEnd(ev)
    })
  
    this.gesture.enable();
  }

  private onMove(detail:any) {
    let aux = {
      type: detail.type,
      from: detail.startY,
      current: detail.currentY,
      delta: detail.deltaY,
    }
    let deltaNomalizada = aux.delta * (-1)
    this.footer.nativeElement.style.transform = `translateY(-${deltaNomalizada}px)` 
    if (deltaNomalizada >= this.deltaMinOnMove){
      this.emitirAlerta()
    }
  }

  private onEnd(detail:any) {
    this.footer.nativeElement.style.transform = `translateY(0px)` 
    let aux = {
      type: detail.type,
      from: detail.startY,
      current: detail.currentY,
      delta: detail.deltaY,
    }
    let deltaNomalizada = aux.delta * (-1)
    if (deltaNomalizada >= this.deltaMin){
      this.emitirAlerta()
    }
  }

  emitirAlerta() {
    console.log("**** ALERTA EMITIDA ****");

    // destrullo el gesto para que no se active varias veces
    this.gesture.destroy();
    
    this.zone.run(() => {
      this.router.navigate(['/post-emitir']);
    });

    // creo de nuevo el gesto
    this.crearGesto()
  }

}
