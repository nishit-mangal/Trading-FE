import { useState } from "react";
import "./App.css";
import { BalanceComponent } from "./Components/BalanceComponent/BalanceComponent";
import { Stocks } from "./Components/Stocks/Stocks";
import { PlaceOrder } from "./Components/PlaceOrder/PlaceOrder";

function App() {
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const [stockData, setStockData] = useState({})
  return (
    <>
      <BalanceComponent />
      <Stocks setShowPlaceOrderModal={setShowPlaceOrderModal} setStockData={setStockData}/>

      {showPlaceOrderModal && (
        <PlaceOrder
          setShowPlaceOrderModal={setShowPlaceOrderModal}
          stockData={stockData}
        ></PlaceOrder>
      )}
    </>
  );
}

export default App;
