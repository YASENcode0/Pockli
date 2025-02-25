import React, { useState } from "react";
import "./settings.css";

export default function Settings() {

  const [on,setOn] = useState(false)

  const settings = {
    lang: "en",
    them: "dark",
  };

  return (
    <div className="settings">
      <div className="settings-label">
        <h4>Currency symbol</h4>
        {/* <div className="settings-choice">
          <div>
            <li>ils</li>
            <li>usd</li>
            <li>eru</li>
          </div>
        </div> */}
      </div>
      <div className="settings-label">
        <h4>language</h4>
        {/* <div className="settings-choice">
          <div>
            <li>en</li>
            <li>ar</li>
            <li>hr</li>
          </div>
        </div> */}
      </div>
      <div className="settings-label">
        <h4>mod</h4>
        <div onClick={()=>{setOn(!on)}} className={`settings-btn ${on && "settings-btn-off"}`}>
          <div></div>
        </div>
      </div>
    </div>
  );
}
