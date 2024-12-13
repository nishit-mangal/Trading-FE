import { useState } from "react";
import { handleApiToResendOTP, handleApiToValidateOTP } from "../apiHandler";
import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";

export const Otp = ({ email, setResponseErr, page, setVerified }) => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(Array(6).fill(""));

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input
        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < pasteData.length; i++) {
            if (/^\d$/.test(pasteData[i])) {
                newOtp[i] = pasteData[i];
            }
        }
        setOtp(newOtp);
    };

    const handleResendOTP = async () => {
        let { status, msg } = await handleApiToResendOTP(email);
        if (status === "Err") {
            setResponseErr(msg);
            setOtp(Array(6).fill(""));
            return;
        }
        setResponseErr(null);
    };

    const handleVerifyOTP = async () => {
        let { status, msg } = await handleApiToValidateOTP(email, otp);
        if (status === "Err") {
            setResponseErr(msg);
            setOtp(Array(6).fill(""));
            return;
        }
        setResponseErr(null);

        if (page === "Signup") {
            navigate("/login");
            //TODO: delete the already exiting account token otherwise it will login to already login account
            return;
        } else if (page === "Login") {
            navigate({
                pathname: "/login/setPin",
                search: new URLSearchParams({
                    email,
                }).toString(),
            });
            return;
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="text-2xl font-sans font-semibold">Enter OTP</div>
                <div
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    <Logout />
                </div>
            </div>
            <div className="text-xs font-serif text-gray-500">
                recieved on: <span className="font-bold text-teal-800">{email}</span>
            </div>
            <div className="flex justify-center space-x-2 mt-5">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                    />
                ))}
            </div>
            <button
                type="submit"
                className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={handleVerifyOTP}
            >
                Verify OTP
            </button>
            <div className="text-xs text-center mt-3">
                Did not receive OTP? Try
                <span
                    className="ml-1 text-teal-700 font-bold hover:cursor-pointer font-sans"
                    onClick={handleResendOTP}
                >
                    Resend
                </span>
            </div>
        </div>
    );
};
