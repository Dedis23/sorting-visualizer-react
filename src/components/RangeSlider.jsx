import React from "react";

const RangeSlider = (props) => {
  const { label, minValue, maxValue, value, onChangeCB, disabled } = props;
  return (
    <>
      <p>{label}</p>
      <input
        type="range"
        disabled={disabled}
        value={value}
        min={minValue}
        max={maxValue}
        onChange={onChangeCB}
      />
    </>
  );
};

export default RangeSlider;
