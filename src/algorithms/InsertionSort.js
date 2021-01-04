import { swap } from "./utills";

export const getInsertionSortAnimations = (array) => {
  const arrayCopy = [...array];
  const animations = [];
  let n = arrayCopy.length;
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      animations.push([[j], "active"]);
      if (arrayCopy[j + 1] < arrayCopy[j]) {
        animations.push([[j, j + 1], "swap", false]);
        swap(arrayCopy, j, j + 1);
      }
    }
  }
  return animations;
};
