import { useState } from "react";
import "./OrderHistoryBtn.css";
import { OrderHistory } from "../OrderHistory/OrderHistory";
import historyImage from "../../assets/transaction-history.png"

export const OrderHistoryBtn = () => {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-between p-2 rounded-xl hover:bg-[rgba(20,150,150,0.2)] hover:cursor-pointer" onClick={() => setShowOrderHistory(true)}>
        <img src={historyImage} alt="order history image" height={30} width={30} className="p-1"></img>
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
