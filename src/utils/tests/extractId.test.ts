import { extractIdFromUrl } from '../../utils/extractId';

describe('extractIdFromUrl', () => {
  it('extracts the last segment of a valid URL', () => {
    const url = 'https://swapi.info/api/people/1/';
    expect(extractIdFromUrl(url)).toBe('1');
  });

  it('works without trailing slash', () => {
    const url = 'https://swapi.info/api/people/42';
    expect(extractIdFromUrl(url)).toBe('42');
  });

  it('returns null on empty string', () => {
    expect(extractIdFromUrl('')).toBeNull();
  });

  it('returns null if no segments are found', () => {
    expect(extractIdFromUrl('/')).toBeNull();
    expect(extractIdFromUrl('////')).toBeNull();
  });

  it('handles URLs with multiple slashes cleanly', () => {
    const url = 'https://swapi.info/api/people///7//';
    expect(extractIdFromUrl(url)).toBe('7');
  });
});
