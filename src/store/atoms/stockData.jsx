import { atom } from "recoil";

export const stockData = atom({
  key: "stockData",
  default: {
    companyName: "",
    tradingSymbol: "",
    profit: 0,
    quantity: 0,
    averagePrice: 0.00,
    closingPrice: 0.00,
    instrumentToken: "",
    oneYearMax: 0,
    percentFromMax: null,
  },
});

export const showPlaceOrderModal = atom({
    key: 'showPlaceOrderModal',
    default:false
})
