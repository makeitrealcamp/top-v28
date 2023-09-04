import { describe, test, expect } from 'vitest';

import { parsePaginationParams } from './utils.ts';

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
