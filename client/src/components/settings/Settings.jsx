import React, { useState } from "react";
import "./settings.css";
import Choice from "../cutoms/Choice/Choice";
import currencySymbol from "currency-symbol";

export default function Settings() {
   const [on, setOn] = useState(false);
   const settings = {
      lang: "en",
      them: "dark",
   };

   const abc = currencySymbol.symbol("usd");

   function decodeHtmlEntity(encodedStr) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(encodedStr, "text/html");
      return doc.body.textContent || doc.documentElement.textContent;
   }

   return (
      <div className="settings">
         <h1>{decodeHtmlEntity(abc)}</h1>
         <Choice
            title="Currency symbol"
            list={["ILS", "USD", "ERU"]}
            defaultChoice="ILS"
         />
         <Choice
            title="language"
            list={["en", "ar", "hr"]}
            defaultChoice="ILS"
         />
         <div className="settings-label">
            <h4>mod</h4>
            <div
               onClick={() => {
                  setOn(!on);
               }}
               className={`settings-btn ${on && "settings-btn-off"}`}
            >
               <div></div>
            </div>
         </div>
      </div>
   );
}
