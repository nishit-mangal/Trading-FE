// export const localPort = "http://localhost:8000";
export const localPort = "https://api-finance.nishit.online";

// export const prodURL = "http://localhost:5173"
export const prodURL = "https://finance.nishit.online";

// export const webSocketURL = "ws://localhost:8000";
export const webSocketURL = "wss://api-finance.nishit.online";

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
  RESET_PASSWORD: "/user/resetPassword",
  FORGOT_PASSWORD: "/user/forgotPassword",
  RESET_FORGOT_PASSWORD: "/user/resetForgotPassword",
  GET_USER: "/user/getUser",
  SET_API_SECRETS: "/user/setAPISecrets",
  GOOGLE_CODE_AUTH: "/authorization/googleAuth"
};

export const OTP_TYPES = {
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
  SET_PIN: "SET_PIN"
}

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

export const defaultHoldingData = [
  {
      "companyName": "ADANI GREEN ENERGY LTD",
      "tradingSymbol": "ADANIGREEN",
      "profit": 1245.3,
      "quantity": 4,
      "averagePrice": 700.77,
      "closingPrice": 1012.1,
      "instrumentToken": "NSE_EQ|INE364U01010",
      "oneYearMax": 2070.55,
      "percentFromMax": -52
  },
  {
      "companyName": "JIO FIN SERVICES LTD",
      "tradingSymbol": "JIOFIN",
      "profit": 1344.14,
      "quantity": 9,
      "averagePrice": 95.1,
      "closingPrice": 244.45,
      "instrumentToken": "NSE_EQ|INE758E01017",
      "oneYearMax": 387.95,
      "percentFromMax": -37
  },
  {
      "companyName": "ADANI PORT & SEZ LTD",
      "tradingSymbol": "ADANIPORTS",
      "profit": 5681.8,
      "quantity": 10,
      "averagePrice": 525.97,
      "closingPrice": 1094.15,
      "instrumentToken": "NSE_EQ|INE742F01042",
      "oneYearMax": 1590.15,
      "percentFromMax": -32
  },
  {
      "companyName": "MONTE CARLO FASHIONS LTD.",
      "tradingSymbol": "MONTECARLO",
      "profit": 2148.5,
      "quantity": 14,
      "averagePrice": 518.94,
      "closingPrice": 672.4,
      "instrumentToken": "NSE_EQ|INE950M01013",
      "oneYearMax": 952.2,
      "percentFromMax": -30
  },
  {
      "companyName": "APOLLO TYRES LTD",
      "tradingSymbol": "APOLLOTYRE",
      "profit": 4531.55,
      "quantity": 20,
      "averagePrice": 196.82,
      "closingPrice": 423.4,
      "instrumentToken": "NSE_EQ|INE438A01022",
      "oneYearMax": 564.25,
      "percentFromMax": -25
  }
]