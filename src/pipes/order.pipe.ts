import { Pipe, PipeTransform } from '@angular/core';
import { Dragon } from './../app/_models/dragon';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(DragonTransform: Dragon[], path: string[], order: number): Dragon[] {

    if (!DragonTransform || !path || !order) { return DragonTransform; }

    return DragonTransform.sort((a: Dragon, b: Dragon) => {
      path.forEach(property => {
        a = a[property];
        b = b[property];
      });

      return a > b ? order : order * (- 1);
    });
  }
}
