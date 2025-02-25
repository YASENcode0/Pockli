import React from "react";
import "./card.css";
import { MdModeEditOutline } from "react-icons/md";
import { LuFuel } from "react-icons/lu";
import { IoFastFood } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiMoneyWavyFill } from "react-icons/pi";

export default function Card({ value, editCard }) {
  const date = new Date(value?.date);
  function getCategory() {
    switch (value?.category) {
      case "food":
        return <IoFastFood />;
      case "fuel":
        return <LuFuel />;
      case "shopping":
        return <HiOutlineShoppingBag />;
      case "income":
        return <PiMoneyWavyFill />;
      default:
        return <TbMoneybag />;
    }
  }

  return (
    <div className="card">
      <div className={`card-icon ${value?.category}`}>{getCategory()}</div>
      <h2>
        <span>{value?.title}</span>
        <span className={(!value.type && "amount-expend") || "amount-income"}>
          ${value?.amount.toLocaleString()}
        </span>
      </h2>
      <h4>{date?.toLocaleString("en-ZA")}</h4>
      <div
        className="card-edit-btn"
        onClick={() => {
          editCard(value);
        }}
      >
        <MdModeEditOutline />
      </div>
    </div>
  );
}
