import { useRecoilValue, useSetRecoilState } from "recoil";
import { handleApiToTrade } from "../../apiHandler";
import { OrderStatus } from "../../constants";
import "./PlaceOrder.css";
import { useEffect, useState } from "react";
import { showPlaceOrderModal, stockData } from "../../store/atoms/stockData";

export const PlaceOrder = ( {webSocket, messageRec} ) => {
  const data = useRecoilValue(stockData);
  const setShowPlaceOrderModal = useSetRecoilState(showPlaceOrderModal);
  const [quantity, setQuantity] = useState(0);

  useEffect(()=>{
    webSocket.send(`SUBSCRIBE ${data.instrumentToken}`)
  }, [])

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
        <div className="flex justify-end">
          <button onClick={cancelButton} >
            <img src="src\assets\close.png" alt="Cancel" height={15} width={15}></img>
          </button>
        </div>
        <p className="mt-2">
          We only support 'MARKET' orders and 'DAY' delivery for now. We don't
          support intraday 'IOC' orders or 'LIMIT' orders.
        </p>
        <input
          id="quantity"
          placeholder="Quantity"
          type="number"
          min="0"
          onChange={handleInputTag}
          className="mt-4 p-1"
        ></input>

        <div className="table-container-placeOrder">
          <div className="row">
            <div className="cell">Company Name: </div>
            <div>{data.companyName}</div>
          </div>
          <div className="row">
            <div className="cell">Current Quantity: </div>
            <div>{data.quantity}</div>
          </div>
          <div className="row">
            <div className="cell">% from max: </div>
            <div>{data.percentFromMax}</div>
          </div>
          <div className="row">
            <div className="cell">Identifier: </div>
            <div>{data.instrumentToken}</div>
          </div>
          <div className="row">
            <div className="cell">Live Price: </div>
            <div>{messageRec ?? "NA"}</div>
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
