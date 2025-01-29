import { atom } from "recoil";

export const userData = atom({
    key:"userData",
    default:{
        userId:"",
        userEmail:"",
        userName:"",
        secretsExists:false,
        apiKey:"",
        profileImg:""
    }
})