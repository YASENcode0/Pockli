import React from "react";
import "./main.css";
import Progress from "../cutoms/Progress/Progress";

export default function Main() {
  return (
    <div className="main">
      <div className="box-total">
        <h3 className="total-title">total</h3>
        <h3>May 2025</h3>
        <h1>
          <span>$ </span>500
        </h1>
      </div>
      <div className="box-budget">
        <div className="budget-top">
          <div className="budget-top-left">
            <h3>to spend</h3>
            <p>1500</p>
          </div>
          <div className="budget-top-right">
            <h3>to spend</h3>
            <p>2000</p>
          </div>
        </div>
        <div className="budget-bottom">
          <Progress vars={[1,2,3,4,5]}/>
        </div>
      </div>
      <div className="box-last-month"></div>
    </div>
  );
}
