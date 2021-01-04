import React, { useState, useEffect, useRef } from "react";
import { getBubbleSortAnimations } from "../algorithms/BubbleSort";
import { getInsertionSortAnimations } from "../algorithms//InsertionSort";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import { getRandomVal, swap } from "../algorithms//utills";
import "./SortingVisualizer.css";
import RangeSlider from "./RangeSlider";

const MIN_NUM_OF_BARS = 10;
const MAX_NUM_OF_BARS = 100;
const DEFAULT_NUM_OF_BARS = 25;
const MIN_BAR_VAL = 2;
const MAX_BAR_VAL = 89;
const DEFAULT_SPEED = 2;
const MIN_SPEED = 1;
const MAX_SPEED = 3;
const DEFAULT_DELAY = 20; //in miliseconds
const ACTIVE_COLOR = "black";
const SWAPPED_COLOR = "red";
const SORTED_COLOR = "limegreen";

const SortingVisualizer = () => {
  const [barsArray, setBarsArray] = useState([]);
  const [numOfBars, setNumOfBars] = useState(DEFAULT_NUM_OF_BARS);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [delay, setDelay] = useState(DEFAULT_DELAY);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const barsArrayRef = useRef(barsArray);

  const shuffleArray = () => {
    if (isAnimating) return;
    const newArr = Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
      newArr[i] = getRandomVal(MIN_BAR_VAL, MAX_BAR_VAL);
    }
    setBarsArray(newArr);
    resetArrayColour();
    setIsSorted(false);
  };

  useEffect(shuffleArray, [numOfBars]);

  const resetArrayColour = () => {
    const barsArray = barsArrayRef.current.children;
    for (let i = 0; i < barsArray.length; i++) {
      barsArray[i].style.backgroundColor = "";
    }
  };

  const doBubbleSort = () => {
    if (isAnimating || isSorted) return;
    const animations = getBubbleSortAnimations(barsArray);
    doAnimations(animations);
  };

  const doInsertionSort = () => {
    if (isAnimating || isSorted) return;
    const animations = getInsertionSortAnimations(barsArray);
    doAnimations(animations);
  };

  const doMergeSort = () => {
    if (isAnimating || isSorted) return;
    const animations = getMergeSortAnimations(barsArray);
    doAnimations(animations);
  };

  const doAnimations = (animations) => {
    // leave if were already animating
    if (isAnimating) return;

    // start animation
    setIsAnimating(true);
    animations.forEach(([elements, activity, colorSwap], index) => {
      setTimeout(() => {
        if (activity === "active") {
          colorActiveItems(elements);
        } else if (activity === "swap") {
          if (colorSwap) colorSwapItems(elements);
          swapOnBarsArray(elements);
        } else if (activity === "final") {
          colorFinalPosition(elements);
        } else if (activity === "setNewHeight") {
          setNewHeight(elements[0], elements[1]);
        }
      }, index * delay);
    });

    // clear isAnimating state after all the animations (len of animations * delay)
    setTimeout(() => {
      setIsAnimating(false);
      setIsSorted(true);
    }, animations.length * delay);
  };

  const setNewHeight = (i, newHeight) => {
    setBarsArray((prevArray) => {
      const updateArray = prevArray.slice();
      updateArray[i] = newHeight;
      return updateArray;
    });
  };

  const swapOnBarsArray = (elements) => {
    setBarsArray((prevArray) => {
      const [i, j] = elements;
      const updateArray = prevArray.slice();
      swap(updateArray, i, j);
      return updateArray;
    });
  };

  const colorActiveItems = (elements) => {
    elements.forEach((elem) => {
      const arrayBarStyle = barsArrayRef.current.children[elem].style;
      setTimeout(() => {
        arrayBarStyle.backgroundColor = ACTIVE_COLOR;
      }, delay);

      setTimeout(() => {
        arrayBarStyle.backgroundColor = "";
      }, delay * 2);
    });
  };

  const colorSwapItems = (elements) => {
    elements.forEach((elem) => {
      const arrayBarStyle = barsArrayRef.current.children[elem].style;
      arrayBarStyle.backgroundColor = SWAPPED_COLOR;
      setTimeout(() => {
        arrayBarStyle.backgroundColor = "";
      }, delay);
    });
  };

  const colorFinalPosition = (elements) => {
    elements.forEach((elem) => {
      const arrayBarStyle = barsArrayRef.current.children[elem].style;
      setTimeout(() => {
        arrayBarStyle.backgroundColor = SORTED_COLOR;
      }, delay);
    });
  };

  const barsSizeSliderChangeCallback = (e) => {
    setNumOfBars(e.target.value);
    shuffleArray();
  };

  const speedSliderChangeCallback = (e) => {
    // increase speed, deccrease the delay
    if (e.target.value > speed) {
      setDelay(delay / 2);
    } else {
      // decrease speed, increase the delay
      setDelay(delay * 2);
    }
    setSpeed(e.target.value);
  };

  console.log(delay);

  return (
    <>
      <nav className="navbar">
        <div className="controls-bar">
          <li>
            <button className="btn" onClick={doBubbleSort}>
              Bubble sort
            </button>
          </li>
          <li>
            <button className="btn" onClick={doInsertionSort}>
              Insertion sort
            </button>
          </li>
          <li>
            <button className="btn" onClick={doMergeSort}>
              Merge sort
            </button>
          </li>
        </div>
      </nav>
      <section className="visualizer-container">
        <div className="array-container" ref={barsArrayRef}>
          {barsArray.map((barHeight, index) => (
            <div
              className="array-bar"
              style={{
                height: `${barHeight}vmin`,
                width: `${100 / numOfBars}vw`,
              }}
              key={index}
            >
              {barHeight}
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="controls-bar">
          <li>
            <button className="btn" onClick={shuffleArray}>
              Shuffle
            </button>
          </li>
          <li className="bars-size-control">
            <RangeSlider
              disabled={isAnimating}
              label={`Size: ${numOfBars}`}
              minValue={MIN_NUM_OF_BARS}
              maxValue={MAX_NUM_OF_BARS}
              value={numOfBars}
              onChangeCB={barsSizeSliderChangeCallback}
            ></RangeSlider>
          </li>
          <li className="bars-size-control">
            <RangeSlider
              disabled={isAnimating}
              label={`Speed: x${speed}`}
              minValue={MIN_SPEED}
              maxValue={MAX_SPEED}
              value={speed}
              onChangeCB={speedSliderChangeCallback}
            ></RangeSlider>
          </li>
        </div>
      </footer>
    </>
  );
};

export default SortingVisualizer;
