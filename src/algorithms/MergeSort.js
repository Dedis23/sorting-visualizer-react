export const getMergeSortAnimations = (array) => {
  const arrayCopy = array.slice(0);
  const n = arrayCopy.length;
  const tempArray = Array(n);
  const animations = [];
  mergeSort(arrayCopy, tempArray, 0, n - 1, animations);
  return animations;
};

const mergeSort = (array, tempArray, left, right, animations) => {
  if (right <= left) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSort(array, tempArray, left, mid, animations); //  left part is sorted
  mergeSort(array, tempArray, mid + 1, right, animations); // right part is sorted
  merge(array, tempArray, left, mid, right, animations);
};

const merge = (array, tempArray, left, mid, right, animations) => {
  // copy array into tempArray
  for (let i = left; i <= right; i++) {
    tempArray[i] = array[i];
  }

  let arr1Idx = left; // start of first array
  let arr2Idx = mid + 1; // start of second array
  for (let i = left; i <= right; i++) {
    if (arr1Idx > mid) {
      animations.push([[arr2Idx], "active"]);
      animations.push([[i, tempArray[arr2Idx]], "setNewHeight"]);

      array[i] = tempArray[arr2Idx++];
    } else if (arr2Idx > right) {
      animations.push([[arr1Idx], "active"]);
      animations.push([[i, tempArray[arr1Idx]], "setNewHeight"]);

      array[i] = tempArray[arr1Idx++];
    } else if (tempArray[arr2Idx] < tempArray[arr1Idx]) {
      animations.push([[arr1Idx, arr2Idx], "active"]);
      animations.push([[i, tempArray[arr2Idx]], "setNewHeight"]);

      array[i] = tempArray[arr2Idx++];
    } else {
      animations.push([[arr1Idx, arr2Idx], "active"]);
      animations.push([[i, tempArray[arr1Idx]], "setNewHeight"]);

      array[i] = tempArray[arr1Idx++];
    }
  }
};
