import "./App.css";
import { useEffect, useState } from "react";
import NavSearch from "./Components/NavSearch";
import StockInfo from "./Components/StockInfo";
import Watchlist from "./Components/Watchlist";
import StockInfoModal from "./Components/StockInfoModal";
import { useLocalStorage } from "./helperFuncs";

const App = () => {
  const [stockData, setStockData] = useState([]);
  const [stockName, setStockName] = useState("");
  const [watchListName, setWatchListName] = useState("");
  const [stockModal, setStockModal] = useState(false);
  const [watchList, setWatchList] = useLocalStorage("watchList", []);
  const MINUTE_MS = 30000;

  const urls = [
    `https://finnhub.io/api/v1/quote?symbol=${stockName}&token=c9k2iqqad3i978qirrb0`,
    `https://finnhub.io/api/v1/stock/metric?symbol=${stockName}&metric=all&token=c9k2iqqad3i978qirrb0`,
    `https://finnhub.io/api/v1/stock/profile2?symbol=${stockName}&token=c9k2iqqad3i978qirrb0`,
  ];

  const getStockData = async (e) => {
    e.preventDefault();
    const texts = await Promise.all(
      urls.map(async (url) => {
        const resp = await fetch(url);

        return resp.json();
      })
    );

    const mergeItems = Object.assign(...texts);

    setStockData(mergeItems);

    return mergeItems;
  };

  const handleWatchList = () => {
    setWatchList((prevState) => [...prevState, stockData]);
  };

  const showModalAndStockInfo = (name) => {
    setWatchListName(name);
    setStockModal((prevState) => !prevState);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let newArr = [];
      if (watchList.length > 0) {
        watchList.map(async ({ symbol }) => {
          const urlsStock = [
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c9k2iqqad3i978qirrb0`,
            `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=c9k2iqqad3i978qirrb0`,
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c9k2iqqad3i978qirrb0`,
          ];
          const texts = await Promise.all(
            urlsStock.map(async (url) => {
              const resp = await fetch(url);
              return resp.json();
            })
          );

          newArr.push(Object.assign(...texts));
          localStorage.removeItem("watchList");
          setWatchList(newArr);
        });
      }
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [watchList, setWatchList]);

  return (
    <div className='App'>
      <NavSearch
        stockName={stockName}
        setStockName={setStockName}
        getStockData={getStockData}
      />
      <div className='items'>
        <StockInfo
          stockData={stockData}
          handleWatchList={handleWatchList}
          watchList={watchList}
        />
        <Watchlist
          watchList={watchList}
          showModalAndStockInfo={showModalAndStockInfo}
        />
      </div>
      {stockModal && (
        <StockInfoModal
          watchList={watchList}
          watchListName={watchListName}
          setStockModal={setStockModal}
        />
      )}
    </div>
  );
};

export default App;
