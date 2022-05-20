import React from "react";
import StockButton from "./StockButton";

const Watchlist = ({ watchList, showModalAndStockInfo }) => {
  return (
    <div>
      {watchList.map(({ symbol, name, c, weburl }) => {
        return (
          <div key={weburl}>
            {symbol} - {name} - {c}{" "}
            <StockButton
              onClick={() => showModalAndStockInfo(symbol)}
              text={`View ${symbol}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Watchlist;
