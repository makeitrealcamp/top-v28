// function to format numbers in compact notation
export function formatNumber(number) {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(number);
}
