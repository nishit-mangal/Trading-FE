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

export async function callApiToFetchOrders(data) {
  let params = {
    pageNumber:data
  }
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.FETCH_ORDERS}/${data}`,
  };

  return await axios(config);
}

export async function callApiToGenerateCode(code) {
  let params = {
    code
  }
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.GENERATE_ACCESS_TOKEN}`,
    params
  };

  return await axios(config);
}