import React, { useEffect, useState, useRef } from "react";
import "./main.css";
import Progress from "../cutoms/Progress/Progress";
///icons
import { LuFuel } from "react-icons/lu";
import { IoFastFood } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiMoneyWavyFill } from "react-icons/pi";
import { MdHistory } from "react-icons/md";
///

/// last month speend breoplem ,  lastCard useLess

export default function Main({
   count = 0,
   getAllCards,
   setBudgetPopUp,
   budgetPlan,
}) {
   const spend = useRef(0);
   const monthlyBudget = useRef(0);
   console.log(budgetPlan);
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

      const total = budgetPlan?.budget - spend.current;
      monthlyBudget.current = total;
      return total;
   }

   function addBudgetPlan() {
      setBudgetPopUp(true);
   }

   function GetSpendByCategory(category) {
      const categorySpent = getAllCards()?.filter((card) => {
         return card?.category === category;
      });

      console.log(categorySpent);
      return categorySpent;
   }

   function GetUsedCategory() {
      const uniqueByType = getAllCards().reduce((acc, item) => {
         if (!acc.some((i) => i.category === item.category)) {
            acc.push(item);
         }
         return acc;
      }, []);
      return uniqueByType;
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
         {budgetPlan?.budget ? (
            <>
               <p>{budgetPlan?.title}</p>
               <div className={` box-budget `}>
                  <div className={`budget-top `}>
                     <div className="budget-top-left">
                        <p>Left to spend</p>
                        <h3>$ {LastMonthSpend()}</h3>
                     </div>
                     <div className="budget-top-right">
                        <p>Monthly budget</p>
                        <h3>$ {budgetPlan?.budget}</h3>
                     </div>
                  </div>
                  <div className="budget-bottom">
                     <Progress
                        max={budgetPlan?.budget}
                        current={budgetPlan?.budget - monthlyBudget.current}
                     />
                  </div>
               </div>
            </>
         ) : (
            <div className={`box-budget plus-box-budget`}>
               <h5>add budget plan</h5>
               <h2 onClick={addBudgetPlan}>+</h2>
            </div>
         )}
         <div className="box-last-month">
            <div className="box-last-month-title">
               <MdHistory />
               <h3>last month spent by Category</h3>
            </div>
            <div className="last-month-box2">
               {GetUsedCategory()?.map((card, i) => (
                  <LaseMonthCard
                     key={i}
                     spent={GetSpendByCategory(card?.category)}
                     name={card?.category}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
function getSpendIcon(name) {
   switch (name) {
      case "fuel":
         return <LuFuel />;
      case "income":
         return <PiMoneyWavyFill />;
      case "shopping":
         return <HiOutlineShoppingBag />;
      case "food":
         return <IoFastFood />;
      case "bills":
         return <TbMoneybag />;
      default:
         return <img src="" alt="icon" />;
   }
}

function LaseMonthCard({ spent, name }) {
   const spends = spent?.reduce((sum, card) => {
      if (new Date(card?.date).getMonth() === new Date().getMonth())
         return card?.type ? sum + card?.amount : sum - card?.amount;
   }, 0);

   return (
      <div className="last-month-box1">
         <div className={`${name} card-icon`}>{getSpendIcon(name)}</div>
         <p>{new Date(spent[0]?.date).toLocaleString("en-ZA")}</p>
         <p className={spends > 0 ? "green" : "red"}>{spends}</p>
      </div>
   );
}
