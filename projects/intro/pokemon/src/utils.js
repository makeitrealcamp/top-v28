function getRandomNumber(max = 1, min = 0) {
  return min + Math.floor(Math.random() * max);
}
function calculateStatus(initial, current, count) {
  const newHealth = Math.max(0, current - count);
  const newPercentage = Math.ceil((newHealth / initial) * 100);
  return {
    newHealth,
    newPercentage,
  };
}
function calculateBarColor(percentage) {
  if (percentage > 66) return 'green';
  if (percentage > 33) return 'orange';
  return 'red';
}
