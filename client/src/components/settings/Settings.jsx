import React, { useState } from "react";
import "./settings.css";
import Choice from "../cutoms/Choice/Choice";
import currencySymbol from "currency-symbol";

export default function Settings() {
   const [on, setOn] = useState(false);
   const [settings, setSettings] = useState({
      lang: "en",
      them: "dark",
      CSymbol: "USD",
   });
   const abc = currencySymbol.symbol("usd");

   function handleSettings(value, name) {
      console.log(value);
      setSettings({ ...settings, [name]: value });
   }

   function decodeHtmlEntity(encodedStr) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(encodedStr, "text/html");
      return doc.body.textContent || doc.documentElement.textContent;
   }

   return (
      <div className="settings">
         <h1>{settings?.CSymbol}</h1>
         <Choice
            name={"CSymbol"}
            title="Currency symbol"
            list={["ILS", "USD", "ERU"]}
            defaultChoice="ILS"
            handle={handleSettings}
         />
         <h1>{settings?.lang}</h1>
         <Choice
            name={"lang"}
            title="language"
            list={["en", "ar", "hr"]}
            defaultChoice="ILS"
            handle={handleSettings}
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
