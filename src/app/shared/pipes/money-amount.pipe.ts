import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyAmount',
  standalone: true
})
export class MoneyAmountPipe implements PipeTransform {

  transform(amount: string): string {
    return `$${amount} million`;
  }

}
