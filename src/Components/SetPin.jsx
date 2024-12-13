import { useEffect, useState } from "react";
import { handleApiToSetPin, handleApiToVerifyPin, handleApiToVerifyToken } from "../apiHandler";
import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import { LOCAL_STORAGE } from "../constants";

export const SetPin = () => {
    const [pin, setPin] = useState(Array(4).fill(""));
    const [pageType, setPageType] = useState();
    const [urlEmail, setUrlEmail] = useState();
    const [userDetail, setUserDetail] = useState({ email: "", password: "" });

    const [responseErr, setResponseErr] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const urlParams = window.location.pathname;
        setUrlEmail(urlSearchParams.get("email"));
        if (urlParams.includes("enterPin")) setPageType("enterPin");
        else setPageType("setPin");
    }, [window.location.pathname]);

    useEffect(()=>{
        if(localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN))
            verifyToken(localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN));
        else
            navigate({
                pathname: "/login"
            });
        
    },[])

    const verifyToken = async (token) => {
        let {status, msg} = await handleApiToVerifyToken(token);
        if(status==="Err")
            return;

        if (msg?.isVerified === false) {
            navigate({
                pathname: "/login"
            });
            return;
        }
        
        if(document.cookie && document.cookie.includes("session-token")){
            navigate({
                pathname: "/"
            });
            return;
        }

        navigate({
            pathname: msg.hasPin===true ? "/login/enterPin" : "/login/setPin",
            search: new URLSearchParams({
                email: msg.userEmail
            }).toString()
        });        
    }

    const handlePinChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Move to the next input
        if (value && index < pin.length - 1) {
            const nextInput = document.getElementById(`pin-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            const prevInput = document.getElementById(`pin-input-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 4);
        const newPin = [...pin];
        for (let i = 0; i < pasteData.length; i++) {
            if (/^\d$/.test(pasteData[i])) {
                newPin[i] = pasteData[i];
            }
        }
        setPin(newPin);
    };

    const handleForgotPin = () => {
        setPageType("setPin");
        navigate({
            pathname: "/login/setPin",
            search: new URLSearchParams({
                email: urlEmail
            }).toString()
        });
    };

    const handleSetPin = async (e) => {
        e.preventDefault();

        let { status, msg } = await handleApiToSetPin(userDetail.email, pin, userDetail.password);
        if (status === "Err") {
            setResponseErr(msg);
            setPin(Array(4).fill(""));
            return;
        }
        setResponseErr(null);
        localStorage.setItem(LOCAL_STORAGE.USER_LOGIN_TOKEN, msg.loginToken);
        navigate("/");
    };

    const handleVerifyPin = async (e) => {
        e.preventDefault();
        // console.log(storeUserData);
        let { status, msg } = await handleApiToVerifyPin(urlEmail, pin);
        if (status === "Err") {
            setResponseErr(msg);
            setPin(Array(4).fill(""));
            return;
        }
        setResponseErr(null);
        navigate("/");
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserDetail({
            ...userDetail,
            [name]: value
        });
    }
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-teal-50">
            {responseErr && (
                <div className="text-red-700 font-light font-serif text-base mt-1 mb-4">
                    {responseErr}
                </div>
            )}
            <div className="flex flex-col justify-evenly w-full max-w-xs p-8 bg-white shadow-teal-600 shadow-lg rounded-lg">
                <div className="flex justify-between">
                    <div>
                        <div className="text-2xl font-sans font-semibold">
                            {pageType === "setPin" ? "Set Pin" : "Enter Pin"}{" "}
                        </div>
                        <div className="text-xs font-serif text-gray-500">
                            for 2-Factor-Authentication
                        </div>
                    </div>
                    <Logout />
                </div>
                <form onSubmit={pageType === "setPin" ? handleSetPin : handleVerifyPin} className="pt-2" method="post">
                    <div className="flex justify-center space-x-4 mt-5 mb-3">
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                id={`pin-input-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handlePinChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                            />
                        ))}
                    </div>

                    {pageType === "setPin" && (
                        <div>
                            {/* Email Input */}
                            <div className="mt-2">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-gray-500"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userDetail.email}
                                    onChange={handleChange}
                                    className="font-serif text-xs mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mt-2 mr-1">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium text-gray-500"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={userDetail.password}
                                    onChange={handleChange}
                                    className="text-xs mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                        {pageType === "setPin" ? "Set Pin" : "Verify Pin"}
                    </button>
                </form>
                {pageType === "enterPin" && (
                    <div
                        className="text-xs text-center mt-2 ml-2 text-teal-700 font-bold hover:cursor-pointer font-sans"
                        onClick={handleForgotPin}
                    >
                        Forgot PIN?
                    </div>
                )}
            </div>
        </div>
    );
};
