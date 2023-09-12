import { ERRORS } from './const';

// function to format numbers in compact notation
export function formatNumber(number = 0) {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  const result = formatter.format(number);

  // In case is an invalid number
  if (Object.is(result, NaN)) {
    return '0';
  }

  return result;
}

// function to format error messages
export function formatError(e) {
  if (e.name === 'ZodError') {
    return ERRORS.DECODE;
  }
  if (typeof e === 'string') {
    return e;
  }
  if (e instanceof Error || e.message) {
    return e.message;
  }
}
