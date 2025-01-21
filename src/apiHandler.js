import { callApiResetForgetPassword, callApiToFetchOrders, callApiToForgetPassword, callApiToGenerateCode, callApiToGetAccountBalance, callApiToGetPortfolio, callApiToGetUser, callApiToLogin, callApiToRegisterUser, callApiToResendOTP, callApiToResetPassword, callApiToSetPin, callApiToSetSecrets, callApiToTrade, callApiToValidateGoogleCode, callApiToVerifyOTP, callApiToVerifyPin, callApiToVerifyToken } from "./apiContainer";
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

export async function handleApiToGenerateAccessCode(code, userId){
    try{
        let response = await callApiToGenerateCode(code, userId);
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS || !response.data.data){
            return null;
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
        return {status:"Success", msg:response.data.data};
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

export async function handleApiToLogin(email, password){
    try{
        let response = await callApiToLogin({email, password});
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToSetPin(email, pin, password){
    try{
        pin = pin.includes("") ? null : pin.join("");
        let response = await callApiToSetPin({email, pin, password});
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToVerifyPin(email, pin){
    try{
        pin = pin.includes("") ? null : pin.join("");
        let response = await callApiToVerifyPin({email, pin});
        
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToVerifyToken(token){
    try{
        let response = await callApiToVerifyToken({token});
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToResetPassword(email, passwordData){
    try{
        let dataObj = {
            email,
            currPassword:passwordData.currPassword,
            newPassword:passwordData.newPassword,
            confirmNewPassword:passwordData.confirmPassword
        }
        let response = await callApiToResetPassword(dataObj);
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToForgotPassword(email){
    try{
        let response = await callApiToForgetPassword({email:email});
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}


export async function handleApiToResetForgotPassword(userId, token, passwordData){
    try{
        let dataObj = {
            userId,
            token,
            newPassword:passwordData.newPassword,
            confirmNewPassword:passwordData.confirmPassword
        };        
        let response = await callApiResetForgetPassword(dataObj);
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToGetUser(userId){
    try{
        let response = await callApiToGetUser(userId);
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToSetSecret(data){
    try{
        let response = await callApiToSetSecrets(data);
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.responseMessage};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}

export async function handleApiToAuthenticateGoogleCode(code){
    try{
        let response = await callApiToValidateGoogleCode(code);
        if(!response.data || response.data.responseCode!== HttpCode.SUCCESS){
            return {status:"Err", msg: response.data.responseMessage};
        }
        return {status:"Success", msg:response.data.data};
    }catch(err){
        console.log(err);
        return {status:"Err", msg: "Some error occured."};
    }
}