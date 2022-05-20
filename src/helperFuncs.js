import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initialVal = JSON.parse(saved);
  return initialVal || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [stockVal, setStockVal] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(stockVal));
  }, [key, stockVal]);

  return [stockVal, setStockVal];
};
