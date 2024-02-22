import { callApiToGetAccountBalance, callApiToGetPortfolio, callApiToTrade } from "./apiContainer";
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