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
            <div className="data-class p-2">
                <img className="rounded-md align-center" src={logo} alt="Logo" width={150}></img>
                <div className="flex flex-col justify-center">
                    <div className="p-2 text-xs border-solid border border-gray-300 rounded-lg shadow-lg">
                        Hi, {data.userName}
                    </div>
                </div>
                <BalanceComponent />
                <OrderHistoryBtn />
                <GenerateAccessCode />
                <ResetPasswordBtn />
                <Logout />
                {showApiPage && <ApiPage setShowApiPage={setShowApiPage} userId={data.userId}/>}
            </div>
            <Table />
        </>
    )
}