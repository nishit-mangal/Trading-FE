import { useRecoilValue } from "recoil";
import { Stocks } from "../Stocks/Stocks";
import { PlaceOrder } from "../PlaceOrder/PlaceOrder";
import { showPlaceOrderModal } from "../../store/atoms/stockData";

export const Table = () => {
  const isShowPlaceOrderModal = useRecoilValue(showPlaceOrderModal);
  return (
    <>
      <Stocks />
      {isShowPlaceOrderModal && <PlaceOrder />}
    </>
  );
};
