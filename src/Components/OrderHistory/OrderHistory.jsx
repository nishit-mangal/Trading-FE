import { useEffect, useState, useRef } from "react";
import { options, pageSizeToFetchOrders } from "../../constants";
import "./OrderHistory.css";
import { handleApiToFetchOrders } from "../../apiHandler";

export const OrderHistory = ({ setShowOrderHistory }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastData, setIsLastData] = useState(false)

  const orderHistoryContainerRef = useRef(null);

  const cancelButton = () => {
    setShowOrderHistory(false);
  };
  const handleScroll = async () => {
    if(isLastData){
      return
    }
    // console.log(orderHistoryContainerRef.current.scrollHeight, orderHistoryContainerRef.current.scrollTop, orderHistoryContainerRef.current.clientHeight)
    //0.2 is given so that multiple update doesn't happen for pageNumber. We could have also updated the pageNumber after receiving API response.
    if (
      (orderHistoryContainerRef.current.scrollHeight -
        orderHistoryContainerRef.current.scrollTop) <=
        (orderHistoryContainerRef.current.clientHeight)+0.5 &&
      !loading && !isLastData
    ) {
      setPageNumber(prev=>prev+1);
    }
  };
  const orderDetails = async () => {
    // console.log("pageNumber", pageNumber)
    setLoading(true);
    let response = await handleApiToFetchOrders(pageNumber);
    setLoading(false);
    if (!response) {
      alert("Unable to fetch orders. Please try again later");
      return;
    }
    // console.log('Response length', response.length, " for ", pageNumber)
    if(response.length < pageSizeToFetchOrders){
      setIsLastData(true)
    }
    setOrdersData((prevOrdersData) => [...prevOrdersData, ...response]);    
  };
  useEffect(() => {
    orderDetails();
  }, [pageNumber]);
  useEffect(() => {
    // console.log(orderHistoryContainerRef.current.scrollHeight, orderHistoryContainerRef.current.scrollTop, orderHistoryContainerRef.current.clientHeight)
    // if(orderHistoryContainerRef.current.scrollHeight===orderHistoryContainerRef.current.clientHeight){
    //   setPageNumber(prev=>prev+1)
    // }
    orderHistoryContainerRef.current.addEventListener("scroll", handleScroll);
    
    return () => {
      orderHistoryContainerRef.current && orderHistoryContainerRef.current.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);
  
  return (
    <div className="orderHistoryContainer">
      <div className="orderContainer" ref={orderHistoryContainerRef}>
        <button className="cancel-button" onClick={cancelButton}>
          Close
        </button>
        <div className="order-row headerRow">
          <div className="col-1"> Order id</div>
          <div className="col-2"> Trading Symbol</div>
          <div className="col-2"> Quantity</div>
          <div className="col-2"> Order Type</div>
          <div className="col-2"> Average Price</div>
          <div className="col-5"> Date & Time</div>
        </div>
        {ordersData.map((row, index) => {
          let date = new Date(row.order_timestamp);
          date.setHours(date.getHours() + 5); // Add 5 hours for IST
          date.setMinutes(date.getMinutes() + 30); // Add 30 minutes for IST

          const formattedTimestamp = date.toLocaleString("en-US", options);
          return (
            <div className="order-row" key={index}>
              <div className="col-1"> {row.order_id}</div>
              <div className="col-2"> {row.trading_symbol}</div>
              <div className="col-2"> {row.quantity}</div>
              <div className="col-2"> {row.order_type}</div>
              <div className="col-2"> {row.average_price}</div>
              <div className="col-5"> {formattedTimestamp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
