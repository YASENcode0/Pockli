import "./App.css";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "./components/settings/Settings";
import All from "./components/all/All";
import PopUp from "./components/popUp/PopUp";
import PlanPopUp from "./components/PlanPopUp/PlanPopUp";
// contexts
import { popUpContext } from "./components/Contexts/PopUpContext";
import { useEffect, useState, useRef } from "react";

export default function App() {
  const [modeOn, setModeOn] = useState(false);
  const [forEdit, setForEdit] = useState(null);
  const [budgetPopUp, setBudgetPopUp] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [budgetPlan, setBudgetPlan] = useState({
    title: "",
    budget: null,
  });

  function HandelSetBudgetPlan(plan) {
    console.log(plan)
    setBudgetPlan(plan)
    const myBudget = JSON.parse(localStorage.getItem("MySettings")) || {};
    const newMySettings = { myBudget, budgetPlan: plan };
    localStorage.setItem("MySettings", JSON.stringify(newMySettings));
  }

  useEffect(()=>{
    const budget = JSON.parse(localStorage.getItem("MySettings")).budgetPlan
    console.log(budget)
    setBudgetPlan(budget)
  },[])

  // const [totalCount, setTotalCount] = useState(0);
  const totalCount = useRef(0);

  function setTotalCount(value) {
    console.log(value);
    totalCount.current = value;
  }
  function switchMode() {
    setModeOn(!modeOn);
    console.log("hello mode");
  }

  (function () {
    setTotalCount(JSON.parse(localStorage.getItem("MySettings"))?.total || 0);
    console.log("App render");
  })();

  function editCard(value = null) {
    setForEdit(value);
    setPopUp(true);
    // console.log(value)
  }

  function getAllCards() {
    const cards = localStorage.getItem("cards");
    return JSON.parse(cards);
  }

  return (
    <div className={`App ${modeOn && "night-mode"}`}>
      <popUpContext.Provider value={{ popUp, setPopUp }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  budgetPlan={budgetPlan}
                  getAllCards={getAllCards}
                  count={totalCount.current}
                  setBudgetPopUp={setBudgetPopUp}
                />
              }
            />
            <Route
              path="/all"
              element={
                <All
                  editCard={editCard}
                  totalCount={totalCount}
                  getAllCards={getAllCards}
                />
              }
            />
            <Route
              path="/settings"
              element={<Settings switchMode={switchMode} />}
            />
          </Routes>
          <PopUp
            setForEdit={setForEdit}
            forEdit={forEdit}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
          />
          <PlanPopUp
            setBudgetPlan={HandelSetBudgetPlan}
            budgetPopUp={budgetPopUp}
            setBudgetPopUp={setBudgetPopUp}
          />
          <Footer />
        </Router>
      </popUpContext.Provider>
    </div>
  );
}
