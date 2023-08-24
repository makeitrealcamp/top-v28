import { parsePaginationParams } from './utils';

describe('Utils', () => {
  test('parsePaginationParams', () => {
    const result = parsePaginationParams({
      limit: '10',
      offset: '0',
    });

    expect(result).toEqual({
      limit: 10,
      offset: 0,
    });
  });
});
