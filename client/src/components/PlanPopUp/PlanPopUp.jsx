import React, { useState } from "react";
import "./PlanPopUp.css";

export default function PlanPopUp({
  budgetPopUp,
  setBudgetPopUp,
  setBudgetPlan,
}) {
  const [plan, setPlan] = useState({
    title: "",
    budget: 0,
  });
  function addPlan() {
    setBudgetPlan(plan);
    closePopUp();
  }
  function closePopUp() {
    setBudgetPopUp(false);
    setPlan({});
  }

  if (budgetPopUp)
    return (
      <div className="planPopUp pop-up">
        <div className="plan-pop-up-div">
          <div>
            <label>plan name</label>
            <input
              type="text"
              onChange={(e) => {
                setPlan({ ...plan, title: e.target.value });
              }}
            />
          </div>
          <div>
            <label>plan amount</label>
            <input
              type="number"
              onChange={(e) => {
                setPlan({ ...plan, budget: e.target.value });
              }}
            />
          </div>
          <button onClick={addPlan}>add</button>
          <button onClick={closePopUp}>cancel</button>
        </div>
      </div>
    );
}
