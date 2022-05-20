import React from "react";

const StockButton = ({ text, onClick, disabled }) => {
  return (
    <div>
      <button type='submit' disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default StockButton;
