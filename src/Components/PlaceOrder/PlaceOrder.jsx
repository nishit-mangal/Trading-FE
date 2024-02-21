import "./PlaceOrder.css";
import { useState } from "react";
export const PlaceOrder = ({setShowPlaceOrderModal, stockData}) => {
  const [quantity, setQuantity] = useState(0);
  const cancelButton = ()=>{
    console.log('Cancel Buttn clicked')
    setShowPlaceOrderModal(false)
  }
  return (
    <div className="place-order-container">
      <div className="place-order-box">
        <button className="cancel-button" onClick={cancelButton}>Cancel</button>
        <p>
          We only support 'MARKET' orders and 'DAY' delivery for now. We don't
          support intraday 'IOC' orders or 'LIMIT' orders.
        </p>
        <input placeholder="Quantity" type="number" min="0"></input>
        <div>Company Name: {stockData.companyName}</div>
        <div>Current Quantity: {stockData.quantity}</div>
        <div>% from max: {stockData.percentFromMax}</div>
        <div>identifier: {stockData.instrumentToken}</div>
        <div className="button-container">
          <div className="buy-button">Buy</div>
          <div className="sell-button">Sell</div>
        </div>
      </div>
    </div>
  );
};
