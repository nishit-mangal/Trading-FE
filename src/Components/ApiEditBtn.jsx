import { useState } from "react";
import { ApiPage } from "./ApiPage";
import editApiIcon from "../assets/resetApiDetails.png"
import { useRecoilValue } from "recoil";
import { userData } from "../store/atoms/userData";

export const ApiEditBtn = () => {
    const [showApiPage, setShowApiPage] = useState(false);
    const data = useRecoilValue(userData);
    const handleApiPage = ()=> {
        setShowApiPage(true);
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center h-12 pb-1 rounded-sm box-border hover:border-b-2 border-teal-700  hover:cursor-pointer" onClick={handleApiPage}>
                <img src={editApiIcon} alt="Api image" height={35} width={35} className="p-1"></img>
                <div
                    className="font-medium"
                    style={{ fontSize: "8px" }}
                >
                    Reset Api Details
                </div>
            </div>
            {showApiPage && <ApiPage setShowApiPage={setShowApiPage} userId={data.userId} buttonType="CLOSE" />}
        </>
    )
}