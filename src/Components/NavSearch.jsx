import React from "react";
import StockButton from "./StockButton";

const NavSearch = ({ stockName, setStockName, getStockData }) => {
  return (
    <div>
      <form onSubmit={getStockData}>
        <input
          type='text'
          name='stock-input'
          value={stockName}
          onChange={(e) => setStockName(e.target.value.toUpperCase())}
        />
        <StockButton text='Search'></StockButton>
      </form>
    </div>
  );
};

export default NavSearch;
