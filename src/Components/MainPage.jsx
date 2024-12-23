import { BalanceComponent } from "./BalanceComponent/BalanceComponent"
import { GenerateAccessCode } from "./GenerateAccessCode"
import { Logout } from "./Logout"
import { OrderHistoryBtn } from "./OrderHistoryBtn/OrderHistoryBtn"
import { ResetPasswordBtn } from "./ResetPasswordBtn"
import { Table } from "./Table/Table"
import { useRecoilValue } from "recoil"
import { userData } from "../store/atoms/userData"

export const MainPage = () => {
    const data = useRecoilValue(userData);
  
    return (
        <>
            <div className="data-class p-2">
                <div className="flex flex-col justify-center">
                    <div className="p-2 text-xs border-solid border border-gray-300 rounded-lg shadow-lg">
                        Hi, {data.userEmail.split("@")[0]}
                    </div>
                </div>
                <BalanceComponent />
                <OrderHistoryBtn />
                <GenerateAccessCode />
                <ResetPasswordBtn />
                <Logout />
            </div>
            <Table />
        </>
    )
}