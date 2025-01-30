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
            <div className="flex flex-col items-center justify-center h-12 pb-1 rounded-sm box-border hover:border-b-2 border-teal-700  hover:cursor-pointer" onClick={handleResetPassword}>
                <img src={resetImg} alt="Reset image" height={35} width={35} className="p-1"></img>
                <div
                    className="font-medium"
                    style={{ fontSize: "8px" }}
                >
                    Reset Password
                </div>
            </div>
            {showPasswordComponent && <ResetPassword setShowPasswordComponent={setShowPasswordComponent}/>}
        </>
    );
};
