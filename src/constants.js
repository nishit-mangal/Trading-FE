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
  GENERATE_ACCESS_TOKEN: '/authorization/generateAccessToken',
  REGISTER_USER: "/user/createUser",
  VALIDATE_OTP:"/user/validateOTP",
  RESEND_OTP:"/user/resendOTP",
  LOGIN:"/user/login",
  SET_PIN:"/user/setPin",
  VERIFY_PIN:"/user/verifyPin",
  VERIFY_TOKEN:"/authorization/verifyToken",
  RESET_PASSWORD: "/user/resetPassword"
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

export const LOCAL_STORAGE = {
  ACCESS_TOKEN: "Upstox Access Token",
  USER_LOGIN_TOKEN : "Access Token"
}

export const API_HEADERS = {
  'Upstox-Access-Token': `Bearer ${localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)}`
}
