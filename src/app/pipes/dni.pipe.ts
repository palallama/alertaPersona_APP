import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dni'
})
export class DniPipe implements PipeTransform {

  transform(dni: number): string {
    let aux = "";
    let count = 1;
    let dniStr = dni.toString();
    
    for (var i = dniStr.length - 1; i >= 0; i--) {
      aux = dniStr[i] + aux;
      if (count==3){
        aux = '.'+aux;
        count = 0;
      }
    }
    return aux;
  }

}
