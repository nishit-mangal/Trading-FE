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
import { ApiEditBtn } from "./ApiEditBtn"
import { Profile } from "./Profile"

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
            apiKey: msg?.apiKey,
            profileImg: msg?.imgUrl
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
                {/* <div className="font-serif font-bold text-xl"> {data.userName} </div> */}
                {/* <BalanceComponent /> */}
                <div className="flex gap-1 lg:gap-5 xl:gap-7 2xl:gap-8 justify-between">
                    <OrderHistoryBtn />
                    <GenerateAccessCode />
                    <ResetPasswordBtn />
                    <ApiEditBtn />
                    <Profile/>
                    <Logout />
                </div>
                {showApiPage && <ApiPage setShowApiPage={setShowApiPage} userId={data.userId} buttonType="LOG_OUT"/>}
            </div>
            <hr></hr>
            <Table />
        </>
    )
}