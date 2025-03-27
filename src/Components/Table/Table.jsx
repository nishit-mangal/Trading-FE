import { useRecoilValue } from "recoil";
import { Stocks } from "../Stocks/Stocks";
import { PlaceOrder } from "../PlaceOrder/PlaceOrder";
import { showPlaceOrderModal } from "../../store/atoms/stockData";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE, webSocketURL } from "../../constants";
import { userData } from "../../store/atoms/userData";

export const Table = () => {
  const data = useRecoilValue(userData);
  const [messageRec, setMessageReceived] = useState("")
  const [sendMessage, setSendMessage] = useState("")
  const [webSocket, setWebSocket] = useState(null)
  useEffect(()=>{
    let socket;
    let upstoxAccessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    try{
      socket = new WebSocket(`${webSocketURL}?token=${upstoxAccessToken}&userId=${data.userId}`);
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
  }, [data.userId]);

  const isShowPlaceOrderModal = useRecoilValue(showPlaceOrderModal);
  return (
    <>
      <Stocks />
      {isShowPlaceOrderModal && <PlaceOrder webSocket={webSocket} messageRec={messageRec} />}
    </>
  );
};
