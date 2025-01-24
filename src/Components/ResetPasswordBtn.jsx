import { useState } from "react";
import { ResetPassword } from "./ResetPassword";

export const ResetPasswordBtn = () => {
    const [showPasswordComponent, setShowPasswordComponent] = useState(false);
    
    const handleResetPassword = ()=>{
        setShowPasswordComponent(true);
    }

    return (
        <>
        <div className="flex items-center ">
            <div
                className="p-2 rounded-xl text-sm font-medium hover:bg-[rgba(20,150,150,0.2)] hover:bg-teal-600 hover:cursor-pointer"
                onClick={handleResetPassword}
            >
                Reset Password
            </div>
        </div>
        {showPasswordComponent && <ResetPassword setShowPasswordComponent={setShowPasswordComponent}/>}
        </>
    );
};
