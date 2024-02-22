import axios from "axios";
import { ApiEndpoints, localPort } from "./constants";

export async function callApiToGetAccountBalance() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.FUNDS}`
  };

  return await axios(config);
}

export async function callApiToGetPortfolio() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.PORTFOLIO}`
  };

  return await axios(config);
}

export async function callApiToTrade(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.TRADE}`,
    data
  };

  return await axios(config);
}
