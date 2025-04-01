export const getRatingColor = rating => {
  if (rating >= 8) {
    return 'green_1';
  }
  if (rating >= 7) {
    return 'green_2';
  }
  if (rating >= 5) {
    return 'green_3';
  }
  return 'red';
};
