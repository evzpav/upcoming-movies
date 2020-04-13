import React, { ReactElement } from "react";
import "./Spinner.css";

function Spinner({ loading, fullPage, text }: any): ReactElement | null {
  if (!loading) {
    return null;
  }

  let spinnerClass = "full-page";
  let spinnerText = "Loading...";

  if (fullPage === false) {
    spinnerClass = "";
  }

  if (text) {
    spinnerText = text;
  }

  return (
    <div className={`spinner ${spinnerClass}`}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="text">{spinnerText}</div>
    </div>
  );
}

export default Spinner;
