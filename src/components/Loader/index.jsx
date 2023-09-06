import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <>
      <div className="modal">
        <div class="lds-ring">
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
