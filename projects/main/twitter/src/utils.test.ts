import { describe, test, expect } from 'vitest';
import { formatNumber } from './utils';

describe('Utils', () => {
  test('formatNumber', () => {
    expect(formatNumber(1_000_000)).toEqual('1M');
    expect(formatNumber()).toEqual('0');
  });
});
