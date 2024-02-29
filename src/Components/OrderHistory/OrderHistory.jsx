import { data, options } from "../../constants";
import "./OrderHistory.css";
export const OrderHistory = ({setShowOrderHistory}) => {
  const cancelButton = () => {
    setShowOrderHistory(false);
  };
  return (
    <div className="orderHistoryContainer">
      <div className="orderContainer">
        <button className="cancel-button" onClick={cancelButton}>
          Close
        </button>
        <div className="order-row headerRow">
          <div className="col-2"> Order id</div>
          <div className="col-1"> Trading Symbol</div>
          <div className="col-1"> Quantity</div>
          <div className="col-1"> Order Type</div>
          <div className="col-1"> Average Price</div>
          <div className="col-5"> Date & Time</div>
        </div>
        {data.map((row, index) => {
          let date = new Date(row.order_timestamp);
          date.setHours(date.getHours() + 5); // Add 5 hours for IST
          date.setMinutes(date.getMinutes() + 30); // Add 30 minutes for IST

          const formattedTimestamp = date.toLocaleString("en-US", options);
          return (
            <div className="order-row">
              <div className="col-2"> {row.order_id}</div>
              <div className="col-1"> {row.trading_symbol}</div>
              <div className="col-1"> {row.quantity}</div>
              <div className="col-1"> {row.order_type}</div>
              <div className="col-1"> {row.average_price}</div>
              <div className="col-5"> {formattedTimestamp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
