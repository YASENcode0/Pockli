import React, { useState } from "react";
import "./settings.css";
import Choice from "../cutoms/Choice/Choice";
import currencySymbol from "currency-symbol";

export default function Settings({ switchMode }) {
   const [on, setOn] = useState(false);
   const [settings, setSettings] = useState({
      lang: "en",
      them: "dark",
      CSymbol: "USD",
   });

   function handleSettings(value, name) {
      console.log(value);
      setSettings({ ...settings, [name]: value });
   }

   return (
      <div className="settings">
         <div>
            <h1>settings page</h1>
         </div>
         <Choice
            name={"CSymbol"}
            title="Currency symbol"
            list={["ILS", "USD", "ERU"]}
            defaultChoice="ILS"
            handle={handleSettings}
         />
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
                  switchMode();
               }}
               className={`settings-btn ${on && "settings-btn-off"}`}
            >
               <h4 className={on ? "settings-btn-title-on" : "settings-btn-title"}>{on ? "on" : "of"}</h4>
               <div></div>
            </div>
         </div>
      </div>
   );
}
