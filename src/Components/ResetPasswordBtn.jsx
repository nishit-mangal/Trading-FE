import { useState } from "react";
import { ResetPassword } from "./ResetPassword";
import resetImg from "../assets/reset-password.png"

export const ResetPasswordBtn = () => {
    const [showPasswordComponent, setShowPasswordComponent] = useState(false);
    
    const handleResetPassword = ()=>{
        setShowPasswordComponent(true);
    }

    return (
        <>
        <div className="flex flex-col items-center justify-between p-2 rounded-xl hover:bg-[rgba(20,150,150,0.2)] hover:cursor-pointer">
            <img src={resetImg} alt="Reset image" height={30} width={30} className="p-1"></img>
            <div
                className="font-medium"
                onClick={handleResetPassword}
                style={{ fontSize: "8px" }}
            >
                Reset Password
            </div>
        </div>
        {showPasswordComponent && <ResetPassword setShowPasswordComponent={setShowPasswordComponent}/>}
        </>
    );
};
