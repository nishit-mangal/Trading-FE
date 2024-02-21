import { callApiToGetAccountBalance, callApiToGetPortfolio } from "./apiContainer";
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