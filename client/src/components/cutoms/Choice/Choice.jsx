import React, { useState } from "react";
import "./choice.css";
import { IoIosArrowDown } from "react-icons/io";

export default function Choice({
   name,
   title = "title",
   list = ["choice1"],
   defaultChoice = "choice",
   handle,
}) {
   const [onOf, setOnOf] = useState(false);
   const [selected, setSelected] = useState(null);

   return (
      <div className="choice-label">
         <h4>{title}</h4>
         <div className={`choice ${onOf && "choice-on"}`}>
            <h4
               onClick={() => {
                  setOnOf(!onOf);
               }}
            >
               {selected || defaultChoice}
               <span>
                  <IoIosArrowDown />
               </span>
            </h4>
            {onOf && (
               <div>
                  {list.map((item, i) => {
                     return (
                        <li
                           key={i}
                           onClick={() => {
                              setSelected(item);
                              setOnOf(false);
                              handle(item, name);
                           }}
                        >
                           {item}
                        </li>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
}
