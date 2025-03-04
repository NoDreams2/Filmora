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

export const formatRating = rating => {
  if (Number.isInteger(rating)) {
    return `${rating}.0`;
  }
  return rating;
};

export const getDeclensionRatingText = count => {
  const lastDigit = count % 10;
  const lastToDigit = count % 100;

  if (lastDigit === 1 && lastToDigit !== 11) {
    return 'оценка';
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastToDigit)
  ) {
    return 'оценки';
  } else {
    return 'оценок';
  }
};

export const getDeclensionActorsText = count => {
  const lastDigit = count % 10;
  const lastToDigit = count % 100;

  if (lastDigit === 1 && lastToDigit !== 11) {
    return 'актер';
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastToDigit)
  ) {
    return 'актера';
  } else {
    return 'актеров';
  }
};
