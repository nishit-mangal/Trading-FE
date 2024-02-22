import { useRecoilValue, useSetRecoilState } from "recoil";
import { handleApiToTrade } from "../../apiHandler";
import { OrderStatus } from "../../constants";
import "./PlaceOrder.css";
import { useState } from "react";
import { showPlaceOrderModal, stockData } from "../../store/atoms/stockData";

export const PlaceOrder = () => {
  const data = useRecoilValue(stockData);
  const setShowPlaceOrderModal = useSetRecoilState(showPlaceOrderModal);
  const [quantity, setQuantity] = useState(0);

  const cancelButton = () => {
    setShowPlaceOrderModal(false);
  };

  const handleInputTag = (e) => {
    if (e.target.value) {
      setQuantity(e.target.value);
    }
  };

  const tradeButton = async (action) => {
    let response = await handleApiToTrade(
      quantity,
      data.instrumentToken,
      action
    );
    if (!response) {
      alert("Issues Placing your order");
    } else if (response.status !== OrderStatus.COMPLETE) {
      alert(
        `Your order was placed with Order id: ${response.order_id} but the current status is ${response.status}. This can be due to insufficient balance.`
      );
    } else {
      alert(`Order placed Successfully. Order Id: ${response.order_id}`);
      setShowPlaceOrderModal(false);
    }
  };

  return (
    <div className="place-order-container">
      <div className="place-order-box">
        <button className="cancel-button" onClick={cancelButton}>
          Cancel
        </button>
        <p>
          We only support 'MARKET' orders and 'DAY' delivery for now. We don't
          support intraday 'IOC' orders or 'LIMIT' orders.
        </p>
        <input
          id="quantity"
          placeholder="Quantity"
          type="number"
          min="0"
          onChange={handleInputTag}
        ></input>
        <div className="table-container">
          <div className="row">
            <div className="cell">Company Name: </div>
            <div className="value">{data.companyName}</div>
          </div>
          <div className="row">
            <div className="cell">Current Quantity: </div>
            <div className="value">{data.quantity}</div>
          </div>
          <div className="row">
            <div className="cell">% from max: </div>
            <div className="value">{data.percentFromMax}</div>
          </div>
          <div className="row">
            <div className="cell">Identifier: </div>
            <div className="value">{data.instrumentToken}</div>
          </div>
        </div>
        <div className="button-container">
          <div className="buy-button" onClick={() => tradeButton("BUY")}>
            Buy
          </div>
          <div className="sell-button" onClick={() => tradeButton("SELL")}>
            Sell
          </div>
        </div>
      </div>
    </div>
  );
};
