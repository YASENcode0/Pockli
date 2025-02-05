import React from "react";
import "./progress.css";

export default function Progress({ vars = [] }) {
  return (
    <div className="my-progress">
      {vars.map((v) => (
        <div style={{ width: `${v * 5}%` }}>{v}</div>
      ))}
    </div>
  );
}
