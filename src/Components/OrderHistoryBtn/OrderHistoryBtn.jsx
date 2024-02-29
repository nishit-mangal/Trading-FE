import { useState } from "react";
import "./OrderHistoryBtn.css";
import { OrderHistory } from "../OrderHistory/OrderHistory";
export const OrderHistoryBtn = () => {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowOrderHistory(true)}
        className="button-container"
      >
        Order Histroy
      </button>
      {showOrderHistory && <OrderHistory setShowOrderHistory={setShowOrderHistory}/>}
    </>
  );
};
