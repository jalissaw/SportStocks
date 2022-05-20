import React from "react";
import StockButton from "./StockButton";
const StockInfoModal = ({ watchList, watchListName, setStockModal }) => {
  const watchListSelected = watchList.find(
    ({ symbol }) => symbol === watchListName
  );

  const {
    c: currentPrice,
    h: highOfDay,
    l: lowOfDay,
    o: openOfDay,
    name,
    metric,
    symbol,
  } = watchListSelected ?? {};
  return (
    <div className='modal'>
      <h1>Company: {name} </h1>
      <h2>Ticker Symbol: {symbol} </h2>
      <h3>Current Price: {currentPrice}</h3>
      <h3>High Of Day: {highOfDay}</h3>
      <h3>52 Week High: {metric?.["52WeekHigh"]}</h3>
      <h3>Open On Day: {openOfDay}</h3>
      <h3>Low Of Day: {lowOfDay}</h3>
      <h3>52 Week Low: {metric?.["52WeekLow"]}</h3>
      <StockButton
        onClick={() => setStockModal((prevState) => !prevState)}
        text='Close'
      />
    </div>
  );
};

export default StockInfoModal;
