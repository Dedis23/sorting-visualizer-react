// this includes bounds - [min, max]
export const getRandomVal = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
