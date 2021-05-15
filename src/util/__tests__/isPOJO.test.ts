import { isPOJO } from '../isPOJO';

describe('isPOJO', () => {
  it('should work', () => {
    expect(isPOJO({})).toBe(true);
    expect(isPOJO(new Object())).toBe(true);
    expect(isPOJO(Object.create(null))).toBe(true);

    expect(isPOJO(false)).toBe(false);
    expect(isPOJO(1)).toBe(false);
    expect(isPOJO('')).toBe(false);
  });
});
