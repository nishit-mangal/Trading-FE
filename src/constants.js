export const localPort = "http://localhost:8000";

export const pageSizeToFetchOrders = 5

export const HttpCode = {
  SUCCESS: "200",
  INTERNAL_SERVER_ERROR: "500",
  BAD_GATEWAY: "502",
};

export const ApiEndpoints = {
  FUNDS: "/user/funds",
  PORTFOLIO: "/portfolio/getHoldings",
  TRADE: "/orders/trade",
  FETCH_ORDERS: "/orders/orderHistory",
  GENERATE_ACCESS_TOKEN: '/authorization/generateAccessToken'
};

export const OrderStatus = {
  COMPLETE: "complete",
};

export const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "UTC",
};