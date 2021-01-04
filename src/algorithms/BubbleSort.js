import { swap } from "./utills";

export const getBubbleSortAnimations = (array) => {
  const arrayCopy = array.slice(0);
  const animations = [];
  let n = arrayCopy.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      //animations.push([[j], "active"]);
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        animations.push([[j, j + 1], "swap", true]);
        swap(arrayCopy, j, j + 1);
      }
    }
    animations.push([[n - i - 1], "final"]);
  }
  return animations;
};
