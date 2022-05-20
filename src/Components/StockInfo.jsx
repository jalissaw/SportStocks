import React from "react";
import StockButton from "./StockButton";

const StockInfo = ({ stockData, handleWatchList, watchList }) => {
  const {
    c: currentPrice,
    h: highOfDay,
    l: lowOfDay,
    o: openOfDay,
    name,
    metric,
    symbol,
  } = stockData ?? {};

  const namesAddedToWatchList = watchList.map(({ symbol }) => symbol);

  return (
    <div>
      <h1>Company: {name} </h1>{" "}
      {name && (
        <StockButton
          text={`Add ${symbol} to Watchlist`}
          onClick={() => handleWatchList()}
          disabled={namesAddedToWatchList.includes(symbol)}
        ></StockButton>
      )}
      <h2>Ticker Symbol: {symbol} </h2>
      <h3>Current Price: {currentPrice}</h3>
      <h3>High Of Day: {highOfDay}</h3>
      <h3>52 Week High: {metric?.["52WeekHigh"]}</h3>
      <h3>Open On Day: {openOfDay}</h3>
      <h3>Low Of Day: {lowOfDay}</h3>
      <h3>52 Week Low: {metric?.["52WeekLow"]}</h3>
    </div>
  );
};

export default StockInfo;
