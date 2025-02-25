import React from "react";
import "./progress.css";

export default function Progress({ max, current = 0 }) {
  const percentage = 100 * (current / max);
  const rangeColor = color();
  function color() {
    if (percentage <= 30) {
      return "#76ff03";
    } else if (percentage <= 60) {
      return "#ffd740";
    } else if (percentage <= 80) {
      return "#ef6c00";
    } else {
      return "#ff3d00";
    }
  }

  return (
    <div className="my-progress">
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: `${rangeColor}`,
        }}
      >
        {Math.floor(percentage)} %
      </div>
    </div>
  );
}
