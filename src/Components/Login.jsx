import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleApiToForgotPassword, handleApiToLogin, handleApiToVerifyToken } from "../apiHandler";
import { Otp } from "./Otp";
import { LOCAL_STORAGE } from "../constants";

export const Login = () => {
    const navigate = useNavigate();
    
    const [isAccountVerified, setIsAccountVerified] = useState(-1);
    const [responseErr, setResponseErr] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [otpEmail, setOTPEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { status, msg } = await handleApiToLogin(
            formData.email,
            formData.password
        );
        if (status === "Err") {
            setResponseErr(msg);
            return;
        }
        setOTPEmail(msg.userEmail);        
        setResponseErr(null);
        
        localStorage.setItem(LOCAL_STORAGE.USER_LOGIN_TOKEN, msg?.accessToken);
        if (msg?.userVerified === false) {
            setIsAccountVerified(0);
            return;
        }
        if (!msg?.userPin) {
            navigate({
                pathname: "/login/setPin",
                search: new URLSearchParams({
                    email: msg.userEmail
                }).toString()
            });
            return;
        }
        navigate({
            pathname: "/login/enterPin",
            search: new URLSearchParams({
                email: msg.userEmail
            }).toString()
        });
        
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleCreateAccount = () => {
        navigate("/register");
    };
    
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if(!formData.email){
            setResponseErr("Enter email to receive reset link.");
            return;
        }
        
        let { status, msg } = await handleApiToForgotPassword(formData.email);
        if (status === "Err") {
            setResponseErr(msg);
            return;
        }
        setResponseErr(null);
        setSuccessMsg(`Reset link has been sent to ${formData.email}.`)
    }
    const verifyToken = async (token) => {
        let {status, msg} = await handleApiToVerifyToken(token);
        if(status==="Err")
            return;
        setOTPEmail(msg.userEmail);
        if (msg?.isVerified === false) {
            setIsAccountVerified(0);
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
    
    useEffect(()=>{
        if(localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN))
            verifyToken(localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN));
        
    },[]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-teal-50">
            {responseErr && (
                <div className="text-red-700 font-light font-serif text-base mt-1 mb-4">
                    {responseErr}
                </div>
            )}
            {successMsg && (
                <div className="text-green-700 font-light font-serif text-base mt-1 mb-4">
                    {successMsg}
                </div>
            )}

            <div className="flex flex-col justify-evenly w-full max-w-sm p-8 bg-white shadow-teal-600 shadow-lg rounded-lg">
                {isAccountVerified === -1 && (
                    <div>
                        <div className="text-2xl font-sans font-semibold">Login</div>

                        <form onSubmit={handleSubmit} className="pt-2" method="post">
                            {/* Email Input */}
                            <div className="form-group mt-2">
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="font-serif text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-group mt-2 mr-1">
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                            >
                                Login
                            </button>
                        </form>
                        <div
                            className="text-xs text-center mt-2 ml-2 text-teal-700 font-bold hover:cursor-pointer font-sans"
                            onClick={handleForgotPassword}
                        >
                            Forgot your password?
                        </div>
                        <div className="text-xs text-center mt-3">
                            Don't have an account?
                            <span
                                className="ml-2 text-teal-700 font-bold hover:cursor-pointer font-sans"
                                onClick={handleCreateAccount}
                            >
                                Create Account
                            </span>
                        </div>
                    </div>
                )}
                {isAccountVerified === 0 && (
                    <Otp
                        email={otpEmail}
                        setResponseErr={setResponseErr}
                        page="Login"
                        setVerified={setIsAccountVerified}
                    />
                )}
            </div>
        </div>
    );
};
