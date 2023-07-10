import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-boton-general',
  templateUrl: './boton-general.component.html',
  styleUrls: ['./boton-general.component.scss'],
})
export class BotonGeneralComponent {
  @Input() label!: string;
  @Input() disabled: boolean = false;
  @Input() style: string = "";
  @Output() botonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.botonClick.emit();
  }
}