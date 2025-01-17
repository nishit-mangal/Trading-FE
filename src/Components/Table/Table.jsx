import { useRecoilValue } from "recoil";
import { Stocks } from "../Stocks/Stocks";
import { PlaceOrder } from "../PlaceOrder/PlaceOrder";
import { showPlaceOrderModal } from "../../store/atoms/stockData";
import { useEffect, useState } from "react";

export const Table = () => {
  const [messageRec, setMessageReceived] = useState("")
  const [sendMessage, setSendMessage] = useState("")
  const [webSocket, setWebSocket] = useState(null)
  useEffect(()=>{
    let socket;
    try{
      socket = new WebSocket('ws://finance-backend-xdyo.onrender.com');
    }catch(err){
      console.log("Error connecting websocket");
    }
    if(!socket)
      return;
    socket.onopen = () =>{
      console.log("connected to Server");
      setWebSocket(socket)
    }
    socket.onmessage = (message) =>{
      console.log(message);
      setMessageReceived(message.data ?? "")
    }
  }, [])
  const isShowPlaceOrderModal = useRecoilValue(showPlaceOrderModal);
  return (
    <>
      <Stocks />
      {isShowPlaceOrderModal && <PlaceOrder webSocket={webSocket} messageRec={messageRec} />}
    </>
  );
};
