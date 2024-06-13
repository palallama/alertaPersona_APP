import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nroTramite'
})
export class NroTramitePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
