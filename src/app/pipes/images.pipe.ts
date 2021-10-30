import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(value: string[]): string {

    if (!value)
      return ''
    else {
      return value[0];
    }
  }

}
