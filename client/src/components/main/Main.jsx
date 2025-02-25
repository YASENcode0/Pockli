import React, { useEffect, useState, useRef } from "react";
import "./main.css";
import Progress from "../cutoms/Progress/Progress";

/// last month speend breoplem ,  lastCard useLess

export default function Main({ count = 0, getAllCards, setBudgetPopUp , budgetPlan }) {
  const spend = useRef(0);
  const monthlyBudget = useRef(0);
  
  const [categories, steCategories] = useState({
    food: 0,
    fuel: 0,
  });

  console.log(categories);
  // useEffect(() => {}, []);

  function LastMonthSpend() {
    spend.current = 0;
    const allCards = getAllCards();
    console.log(allCards);
    allCards?.map((card) => {
      const cardDate = card.date;
      if (
        new Date(cardDate).getMonth() === new Date().getMonth() &&
        !card.type
      ) {
        spend.current += card.amount;
      }
    });

    const total = budgetPlan.budget - spend.current;
    monthlyBudget.current = total;
    return total;
  }

  function addBudgetPlan() {
    setBudgetPopUp(true);
  }

  return (
    <div className="main">
      <div className="box-total">
        <h3 className="total-title">total</h3>
        <h3>May 2025</h3>
        <h1>
          <span>$ </span>
          {count}
        </h1>
      </div>
      <div className={` box-budget  ${!budgetPlan.budget && "no-budget"}`}>
        <div className={`budget-top `}>
          <div className="budget-top-left">
            <p>Left to spend</p>
            <h3>$ {LastMonthSpend()}</h3>
          </div>
          <div className="budget-top-right">
            <p>Monthly budget</p>
            <h3>$ {budgetPlan.budget}</h3>
          </div>
        </div>
        <div className="budget-bottom">
          <Progress
            max={budgetPlan.budget}
            current={budgetPlan.budget - monthlyBudget.current}
          />
        </div>
      </div>
      <div
        className={`box-budget plus-box-budget ${
          budgetPlan.budget && "no-budget"
        }`}
      >
        <h5>add budget plan</h5>
        <h2 onClick={addBudgetPlan}>+</h2>
      </div>
      <div className="box-last-month">
        <div className="last-month-box1">
          <div>icon</div>
          <h2>title</h2>
          <p>$ 700</p>
        </div>
        <div className="last-month-box2">
          <div className="last-month-box2-label">
            <div> icon </div>
            <p>20/20/2025</p>
            <p>$ 200</p>
          </div>
          <div className="last-month-box2-label">
            <div> icon </div>
            <p>20/20/2025</p>
            <p>$ 200</p>
          </div>
          <div className="last-month-box2-label">
            <div> icon </div>
            <p>20/20/2025</p>
            <p>$ 200</p>
          </div>
        </div>
      </div>
    </div>
  );
}
