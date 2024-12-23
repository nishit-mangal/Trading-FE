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
                className="bg-blue-500 text-white pr-5 pl-5 pt-2 pb-2 rounded-md hover:bg-blue-600 hover:cursor-pointer"
                onClick={handleResetPassword}
            >
                Reset Password
            </div>
        </div>
        {showPasswordComponent && <ResetPassword setShowPasswordComponent={setShowPasswordComponent}/>}
        </>
    );
};
