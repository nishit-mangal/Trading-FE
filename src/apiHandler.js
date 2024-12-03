import { callApiToFetchOrders, callApiToGenerateCode, callApiToGetAccountBalance, callApiToGetPortfolio, callApiToRegisterUser, callApiToResendOTP, callApiToTrade, callApiToVerifyOTP } from "./apiContainer";
import { HttpCode } from "./constants";

export async function handleApiToGetAccountBalance(){
    try{
        let response = await callApiToGetAccountBalance()
        if(!response.data || response.data.statusCode!== HttpCode.SUCCESS || !response.data.data){
            return null
        }
        return response.data.data
    }catch(err){
        console.log(err);
        return null;
    }
}

export async function handleApiToGetPortfolio(){
    try{
        let response = await callApiToGetPortfolio()
        if(!response.data || response.data.statusCode!== HttpCode.SUCCESS || !response.data.data){
            return null
        }
        return response.data.data
    }catch(err){
        console.log(err);
        return null;
    }
}

export async function handleApiToTrade(quantity, instrumentToken, transaction_type){
    try{
        let data = {
            quantity,
            price:0,
            instrument_token:instrumentToken,
            transaction_type
        }
        let response = await callApiToTrade(data)
        if(!response.data || response.data.statusCode!== HttpCode.SUCCESS || !response.data.data){
            return null
        }
        return response.data.data
    }catch(err){
        console.log(err);
        return null;
    }
}

export async function handleApiToFetchOrders(pageNumber){
    try{
        let response = await callApiToFetchOrders(pageNumber)
        if(!response.data || response.data.statusCode!== HttpCode.SUCCESS || !response.data.data){
            return null
        }
        return response.data.data
    }catch(err){
        console.log(err);
        return null;
    }
}

export async function handleApiToGenerateAccessCode(code){
    try{
        let response = await callApiToGenerateCode(code)
        if(!response.data || response.data.statusCode!== HttpCode.SUCCESS || !response.data.data){
            return null
        }
        return response.data.data
    }catch(err){
        console.log(err);
        return null;
    }
}

/**
 * 
 * @param {username:string, email:string, password:string} userData 
 * @returns 
 */
export async function handleApiToRegisterUser(userData){
    try{
        let response = await callApiToRegisterUser(userData)
        if(!response.data || response.data.statusCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.data};
        }
        return {status:"Success", msg:"User Created Successfully"};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToValidateOTP(email, otp){
    try{
        otp = otp.includes("") ? null : otp.join("");
        let response = await callApiToVerifyOTP({email, otp});
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:"Account verified."};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToResendOTP(email){
    try{
        let response = await callApiToResendOTP({email});
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.responseMessage};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}