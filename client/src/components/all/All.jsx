import React, { useContext, useEffect, useRef, useState } from "react";
import "./all.css";
import Card from "../cutoms/Card/Card";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
//contexts
import { popUpContext } from "../Contexts/PopUpContext";

export default function All({ getAllCards, totalCount , editCard }) {
  const [selected, setSelected] = useState(0);
  const [cards, setCards] = useState([]);
  const currentCardDate = useRef(null);
  const [sortMode, setSortMode] = useState(false);
  // contexts
  const { popUp, setPopUp } = useContext(popUpContext);
  //methods
  function openPopup() {
    setPopUp(true);
  }
  useEffect(() => {
    const data = getAllCards();
    const allCards = data?.filter((card) => {
      if (selected === 1) return card.type;
      else if (selected === 2) {
        return !card.type;
      }
      return card;
    });

    console.log("render");
    sortByDate(allCards);
  }, [selected, popUp]);
  
  function sortByDate(allCards) {
    setCards(
      allCards?.sort((a, b) => {
        if (sortMode) return new Date(a.date) - new Date(b.date);
        return new Date(b.date) - new Date(a.date);
      })
    );
  }
  
  return (
    <div className="all-div">
      <div className="all-amount">
        $ <span>{totalCount.current.toLocaleString()}</span>
        <button className="add-card" onClick={openPopup}>
          +
        </button>
      </div>
      <div className="all-div-btns">
        <button
          onClick={() => {
            setSelected(0);
          }}
          className={`${selected === 0 && "all-div-btns-select"}`}
        >
          All
        </button>
        <button
          onClick={() => {
            setSelected(1);
          }}
          className={`${selected === 1 && "all-div-btns-select"}`}
        >
          Income
        </button>
        <button
          onClick={() => {
            setSelected(2);
          }}
          className={`${selected === 2 && "all-div-btns-select"}`}
        >
          Expenses
        </button>
      </div>
      <div className="all-cards">
        {cards?.length ? (
          cards?.map((value, i) => {
            const valueDate = new Date(value?.date);
            if (currentCardDate?.current < valueDate?.getMonth()) {
              currentCardDate.current = valueDate;
              console.log(currentCardDate.current.getMonth());
              const date = valueDate;
              return (
                <React.Fragment key={i}>
                  <h4 className="cards-month-label">
                    {"("}
                    {date.toLocaleString("en-US", { month: "long" })}
                    {")"}
                    {date.getMonth()}/{date.getFullYear()}
                  </h4>
                  <Card value={value} editCard={editCard} />
                </React.Fragment>
              );
            }
            currentCardDate.current = valueDate?.getMonth();
            return <Card value={value} key={i} editCard={editCard}/>;
          })
        ) : (
          <div className="empty-cards">
            <span>
              <BsFillFileEarmarkPostFill />
            </span>
            <div className="empty-card-icon">
              <h3>No cards , add card by + button</h3>
              <p>
                <MdSubdirectoryArrowLeft />
              </p>
            </div>
          </div>
        )}
        {/* <h4 className="cards-month-label">May 2025</h4> */}
        {/* <button className="add-card">+</button> */}
      </div>
    </div>
  );
}
