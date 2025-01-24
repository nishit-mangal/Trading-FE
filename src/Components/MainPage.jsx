import { BalanceComponent } from "./BalanceComponent/BalanceComponent"
import { GenerateAccessCode } from "./GenerateAccessCode"
import { Logout } from "./Logout"
import { OrderHistoryBtn } from "./OrderHistoryBtn/OrderHistoryBtn"
import { ResetPasswordBtn } from "./ResetPasswordBtn"
import { Table } from "./Table/Table"
import { useRecoilValue } from "recoil"
import { userData } from "../store/atoms/userData"
import { useEffect, useState } from "react"
import { handleApiToGetUser } from "../apiHandler";
import { useSetRecoilState } from "recoil";
import { ApiPage } from "./ApiPage"
import logo from "../assets/NiVESHHOR.png"

export const MainPage = () => {
    const data = useRecoilValue(userData);
    const setUserData = useSetRecoilState(userData);

    const [showApiPage, setShowApiPage] = useState(false);
    
    const getUserData = async () => {
        let {status, msg} = await handleApiToGetUser(data.userId);
        if(status==="Err")
            return;
        
        setUserData({
            ...data,
            userName: msg?.name,
            secretsExists: msg?.secretsExists,
            apiKey: msg?.apiKey
        })
        setShowApiPage(!msg?.secretsExists);
    } 
    
    useEffect(()=>{
        if(!data.userId)
            return;
        getUserData();
    },[data.userId])

    return (
        <>
            <div className="data-class p-2 items-center">
                <img className="rounded-md" src={logo} alt="Logo" width={100}></img>
                <div className="font-sans font-bold text-lg"> {data.userName} </div>
                {/* <BalanceComponent /> */}
                {/* <OrderHistoryBtn /> */}
                <div className="flex w-80 justify-between">
                    <GenerateAccessCode />
                    <ResetPasswordBtn />
                    <Logout />
                </div>
                {showApiPage && <ApiPage setShowApiPage={setShowApiPage} userId={data.userId}/>}
            </div>
            <hr></hr>
            <Table />
        </>
    )
}