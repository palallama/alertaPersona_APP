import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements ControlValueAccessor, AfterViewInit {
  private renderer = inject(Renderer2);

  onChange!: (value?: any) => void;
  onTouch!: (event: any) => void;
  @Input() disabled: boolean = false;
  @Input() placeholder = '';
  
  @Input() required: boolean = false;
  @Input() label: string = "Label";
  @Input() mostarLabel: boolean = true;
  @Input() aclaracion: string = "";
  @Input() mostrarAclaracion: boolean = false;
  
  @Input() style: string = "";
  @Input() icono: string = "";
  
  @Input() valores!: string[];

  value: string = '';

  @ViewChild('input', {static: false}) input!: ElementRef;

  ngAfterViewInit(): void {
    if (this.icono !== ""){
      this.renderer.setStyle(this.input.nativeElement, 'padding-left', '35px');
    }
  }

  writeValue(value: any) {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisableState(status: boolean) {
    this.disabled = status;
  }
  onInput(event: any) {
    if(this.onChange) {
      this.onChange(event.value);
    }
  }
  onTouched(value: any) {
    if(this.onTouch) {
      this.onTouch(value)
    }
  }
  onFocus() {
    this.input.nativeElement.focus();
  }
}