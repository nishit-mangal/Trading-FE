import { useState } from "react";
import "./OrderHistoryBtn.css";
import { OrderHistory } from "../OrderHistory/OrderHistory";
import historyImage from "../../assets/transaction-history.png"

export const OrderHistoryBtn = () => {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-12 pb-1 rounded-sm box-border hover:border-b-2 border-teal-700 hover:cursor-pointer" onClick={() => setShowOrderHistory(true)}>
        <img src={historyImage} alt="order history image" height={35} width={35} className="p-1"></img>
        <button
          className="font-medium"
          style={{ fontSize: "8px" }}
        >
          Order Histroy
        </button>
      </div>
      {showOrderHistory && <OrderHistory setShowOrderHistory={setShowOrderHistory}/>}
    </>
  );
};
