import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <>
      <div className="modal">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
