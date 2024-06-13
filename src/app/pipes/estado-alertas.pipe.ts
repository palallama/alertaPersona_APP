import { Pipe, PipeTransform } from '@angular/core';
import { AlertaEstado } from '../interfaz/alerta';

@Pipe({
  standalone: true,
  name: 'estadoAlertas'
})
export class EstadoAlertasPipe implements PipeTransform {

  transform(value: string): string {
    if (value==='C'){
      return AlertaEstado.CANCELADA;
    }else if (value==='S'){
      return AlertaEstado.SOLUCIONADA;
    }else if (value==='E'){
      return AlertaEstado.EMITIDA;
    }else{
      return value;
    }
  }

}
