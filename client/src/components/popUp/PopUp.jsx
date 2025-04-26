import React, { useContext, useEffect, useState } from "react";
import "./popUp.css";
import { MdModeEditOutline, MdSettingsInputComposite } from "react-icons/md";
import { LuFuel } from "react-icons/lu";
import { IoFastFood } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiMoneyWavyFill } from "react-icons/pi";
//contexts
import { popUpContext } from "../Contexts/PopUpContext";
//obj
import Card from "../Classes";

//// fix edit card bug

export default function PopUp({ totalCount, forEdit, setForEdit }) {
  const [inputs, setInputs] = useState({ type: false, category: "bills" });
  const [validationErrs, setValidationErrs] = useState({});
  //effects
  useEffect(() => {
    if (forEdit) {
      setInputs(forEdit);
    } else {
      setInputs({ type: false, category: "bills" });
    }
  }, [forEdit]);
  //contexts
  const { popUp, setPopUp } = useContext(popUpContext);
  //methods
  function handelInputsValue(e) {
    const type = e.target.value === "true" ? true : false;

    setInputs({
      ...inputs,
      [e.target.name]: e.target.name === "type" ? type : e.target.value,
    });
    clearErrMessage(e.target.name);
  }
  function handleCategoryValue(value) {
    setInputs({ ...inputs, category: value });
    clearErrMessage("category");
  }
  function clearErrMessage(name) {
    setValidationErrs({ ...validationErrs, [name]: "" });
  }
  function handleAddCard() {
    if (!handelValidation()) return;

    const newCard = new Card(
      inputs?.title,
      parseInt(inputs?.amount),
      inputs?.type,
      inputs?.category,
      forEdit && forEdit.id,
      forEdit && forEdit.date
    );
    pushCard(newCard);
  }
  function pushCard(newCard) {
    try {
      newCard.CardCalculate(
        totalCount,
        { oldAmount: forEdit?.amount, oldType: forEdit?.type },
        forEdit ? true : false
      );
      const cards = JSON.parse(localStorage.getItem("cards")) || [];
      saveCount();

      if (forEdit) {
        const allCards = cards?.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          } else {
            return card;
          }
        });

        localStorage.setItem("cards", JSON.stringify(allCards));

      } else {
        cards.push(newCard);
        localStorage.setItem("cards", JSON.stringify(cards));
      }
      console.log("cards : ", cards);
      handleCancel();
    } catch (err) {
      console.error("err : ", err);
    }
  }
  function saveCount() {
    const settings = JSON.parse(localStorage.getItem("MySettings")) || {};

    localStorage.setItem(
      "MySettings",
      JSON.stringify({ ...settings, total: totalCount.current })
    );
  }
  function handelValidation() {
    if (!inputs?.title) {
      setValidationErrs({ ...validationErrs, title: "title is required" });
      return false;
    }
    if (!inputs?.amount) {
      setValidationErrs({ ...validationErrs, amount: "amount is required" });
      return false;
    }
    if (!inputs?.category) {
      setValidationErrs({
        ...inputs,
        category: "category is required",
      });
      return false;
    }
    return true;
  }
  function handleCancel() {
    setInputs({ type: false, category: "bills" });
    setValidationErrs({});
    setPopUp(false);
    setForEdit(null);
  }
  function handelDelete() {
    const allCards = JSON.parse(localStorage.getItem("cards"));
    const newAllCards = allCards.filter((card) => {
      if (card?.id === forEdit?.id) {
        console.log(card?.id, forEdit?.id);
      }
      return card?.id !== forEdit?.id;
    });
    localStorage.setItem("cards", JSON.stringify(newAllCards));
    console.log(newAllCards);

    const { title, amount, type, category, id, date } = forEdit;
    new Card(title, amount, type, category, id, date).DeleteCard(totalCount);
    saveCount();
    handleCancel();
  }

  if (popUp)
    return (
      <div className="pop-up">
        <div className="pop-up-form">
          <h2>{forEdit ? "edit" : "add"} note</h2>
          <div className="pop-box1">
            <div className="">
              <label>title</label>
              <input
                className={validationErrs?.title && "input-invalid"}
                placeholder="title..."
                type="text"
                name="title"
                onChange={handelInputsValue}
                value={inputs?.title || ""}
              />
              <p className="pop-up-form-err-message">{validationErrs?.title}</p>
            </div>
            <div>
              <label>amount</label>
              <input
                className={validationErrs?.amount && "input-invalid"}
                lang="en"
                type="number"
                name="amount"
                onChange={handelInputsValue}
                value={inputs?.amount || ""}
                placeholder="0.0 $"
              />
              <p className="pop-up-form-err-message">
                {validationErrs?.amount}
              </p>
            </div>
          </div>
          <div className="pop-box2">
            <div>
              <label>type</label>
              <div className="pop-type-input">
                <button
                  onClick={handelInputsValue}
                  name="type"
                  value={"true"}
                  className={`${
                    inputs?.type && "pop-type-input-selected"
                  } pop-type-in-input`}
                >
                  Income
                </button>
                <button
                  onClick={handelInputsValue}
                  name="type"
                  value={"false"}
                  className={`${
                    !inputs?.type && "pop-type-input-selected-ex"
                  } pop-type-ex-input`}
                >
                  Expenses
                </button>
              </div>
            </div>
            <div>
              <label>category</label>
              <input
                type="text"
                value={inputs?.category}
                disabled
                className={validationErrs?.category && "input-invalid"}
              />
              <p className="pop-up-form-err-message">
                {validationErrs?.category}
              </p>
            </div>
          </div>
          <div className="pop-category-types">
            <div
              className={`${
                inputs?.category === "fuel" && "pop-category-types-selected"
              } fuel`}
              onClick={() => {
                handleCategoryValue("fuel");
              }}
            >
              <LuFuel />
            </div>
            <div
              className={`${
                inputs?.category === "food" && "pop-category-types-selected"
              } food`}
              onClick={() => {
                handleCategoryValue("food");
              }}
            >
              <IoFastFood />
            </div>
            <div
              className={`${
                inputs?.category === "bills" && "pop-category-types-selected"
              } bills`}
              onClick={() => {
                handleCategoryValue("bills");
              }}
            >
              <TbMoneybag />
            </div>
            <div
              className={`${
                inputs?.category === "shopping" && "pop-category-types-selected"
              } shopping`}
              onClick={() => {
                handleCategoryValue("shopping");
              }}
            >
              <HiOutlineShoppingBag />
            </div>
            <div
              className={`${
                inputs?.category === "income" && "pop-category-types-selected"
              } income`}
              onClick={() => {
                handleCategoryValue("income");
              }}
            >
              <PiMoneyWavyFill />
            </div>
          </div>
          <div className="pop-form-sub-btns">
            {forEdit && (
              <button className="form-sub-btn-delete" onClick={handelDelete}>
                Delete
              </button>
            )}
            <button className="form-sub-btn-cancel" onClick={handleCancel}>
              cancel
            </button>
            <button className="form-sub-btn-add" onClick={handleAddCard}>
              add
            </button>
          </div>
        </div>
      </div>
    );
}
