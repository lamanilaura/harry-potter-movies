import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    const duration: number = parseInt(value);
    const hours: number = Math.floor(duration / 60);
    const minutes: number = duration % 60;

    return `${hours}h${minutes > 0 ? ' ' + minutes + 'min' : ''}`;
  }

}
