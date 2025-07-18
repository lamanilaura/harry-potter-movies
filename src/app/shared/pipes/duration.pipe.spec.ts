import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "120" to "2h"', () => {
    const result: string = pipe.transform('120');
    expect(result).toBe('2h');
  });

  it('should transform "150" to "2h 30min"', () => {
    const result: string = pipe.transform('150');
    expect(result).toBe('2h 30min');
  });
});
