import axios from "axios";
import { API_HEADERS, ApiEndpoints, localPort } from "./constants";

export async function callApiToGetAccountBalance() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.FUNDS}`,
    headers : API_HEADERS
  };

  return await axios(config);
}

export async function callApiToGetPortfolio() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.PORTFOLIO}`,
    headers : API_HEADERS
  };

  return await axios(config);
}

export async function callApiToTrade(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.TRADE}`,
    data,
    headers : API_HEADERS
  };

  return await axios(config);
}

export async function callApiToFetchOrders(data) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.FETCH_ORDERS}/${data}`
  };

  return await axios(config);
}

export async function callApiToGenerateCode(code, userId) {
  let params = {
    code,
    userId
  }
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.GENERATE_ACCESS_TOKEN}`,
    params
  };

  return await axios(config);
}

export async function callApiToRegisterUser(userData) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.REGISTER_USER}`,
    data:userData
  };

  return await axios(config);
}

export async function callApiToVerifyOTP(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.VALIDATE_OTP}`,
    data
  };

  return await axios(config);
}

export async function callApiToResendOTP(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.RESEND_OTP}`,
    data
  };

  return await axios(config);
}

export async function callApiToLogin(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.LOGIN}`,
    data
  };

  return await axios(config);
}

export async function callApiToSetPin(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.SET_PIN}`,
    data,
    withCredentials:true
  };

  return await axios(config);
}

export async function callApiToVerifyPin(data) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.VERIFY_PIN}`,
    data,
    withCredentials:true
  };

  return await axios(config);
}

export async function callApiToVerifyToken(data){
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.VERIFY_TOKEN}`,
    data
  };

  return await axios(config);
}

export async function callApiToResetPassword(data){
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.RESET_PASSWORD}`,
    data
  };

  return await axios(config);
}

export async function callApiToForgetPassword(data){
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.FORGOT_PASSWORD}`,
    data
  };

  return await axios(config);
}

export async function callApiResetForgetPassword(data){
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.RESET_FORGOT_PASSWORD}`,
    data
  };

  return await axios(config);
}

export async function callApiToGetUser(userId){
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.GET_USER}/${userId}`
  };

  return await axios(config);
}

export async function callApiToSetSecrets(data){
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${localPort}${ApiEndpoints.SET_API_SECRETS}`,
    data
  };

  return await axios(config);
}