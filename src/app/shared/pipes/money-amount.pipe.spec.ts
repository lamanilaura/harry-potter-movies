import { MoneyAmountPipe } from './money-amount.pipe';

describe('MoneyAmountPipe', () => {
  let pipe: MoneyAmountPipe;

  beforeEach(() => {
    pipe = new MoneyAmountPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "10" to "$10 million"', () => {
    const result = pipe.transform('10');
    expect(result).toBe('$10 million');
  });

});
