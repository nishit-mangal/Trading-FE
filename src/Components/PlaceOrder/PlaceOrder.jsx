import { useRecoilValue, useSetRecoilState } from "recoil";
import { handleApiToTrade } from "../../apiHandler";
import { OrderStatus } from "../../constants";
import "./PlaceOrder.css";
import { useEffect, useState } from "react";
import { showPlaceOrderModal, stockData } from "../../store/atoms/stockData";
import closeImg from "../../assets/close.png"

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
        <div className="flex justify-between p-4 gap-8 text-white bg-teal-900 rounded-md">
          <div className="font-bold text-xl font-mono">{data.companyName}</div>
          <button onClick={cancelButton} >
            <img src={closeImg} alt="Cancel" height={12} width={12}></img>
          </button>
        </div>
        
        <div className="py-8 font-extrabold text-5xl text-center font-serif align-middle">{messageRec ?? "NA"} ₹</div>
        <div className="font-bold text-xl font-mono text-teal-900">{data.instrumentToken}</div>
        <div className="font-medium text-base font-sans mt-2 text-teal-900">{data.percentFromMax*-1}% from its 1 year max</div>
        <div className="font-normal text-xs font-sans text-teal-900">{data.quantity} shares in your account</div>
        {/* <p className="mt-2">
          We only support 'MARKET' orders and 'DAY' delivery for now. We don't
          support intraday 'IOC' orders or 'LIMIT' orders.
        </p> */}
        {/* <input
          id="quantity"
          placeholder="Quantity"
          type="number"
          min="0"
          onChange={handleInputTag}
          className="mt-4 p-1"
        ></input> */}

        {/* <div className="flex justify-around mt-4">
          <div className="p-2 min-w-32 PX-10 text-center bg-teal-600 rounded-3xl hover:cursor-pointer" onClick={() => tradeButton("BUY")}>
            Buy
          </div>
          <div className="p-2 min-w-32 px-10 text-center bg-red-400 rounded-3xl hover:cursor-pointer" onClick={() => tradeButton("SELL")}>
            Sell
          </div>
        </div> */}
      </div>
    </div>
  );
};
