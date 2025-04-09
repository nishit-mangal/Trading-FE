import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleApiToAuthenticateGoogleCode, handleApiToForgotPassword, handleApiToLogin, handleApiToVerifyToken } from "../apiHandler";
import { Otp } from "./Otp";
import { LOCAL_STORAGE, prodURL } from "../constants";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import googleImg  from "../assets/google.jpg"
import logo from "../assets/NiVESHHOR.png"
import wizard from "../assets/wizard.png"
import * as  Tooltip from "@radix-ui/react-tooltip";

export const Login = () => {
    const navigate = useNavigate();

    const [isAccountVerified, setIsAccountVerified] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [responseErr, setResponseErr] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [otpEmail, setOTPEmail] = useState("");

    const figureOutRedirection = (msg) => {
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
                    email: msg.userEmail,
                }).toString(),
            });
            return;
        }
        navigate({
            pathname: "/login/enterPin",
            search: new URLSearchParams({
                email: msg.userEmail,
            }).toString(),
        });
    };
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

        figureOutRedirection(msg);
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
        setSuccessMsg();
        if (!formData.email) {
            setResponseErr("Enter email to receive reset link.");
            return;
        }

        let { status, msg } = await handleApiToForgotPassword(formData.email);
        if (status === "Err") {
            setResponseErr(msg);
            return;
        }
        setResponseErr(null);
        setSuccessMsg(`Reset link has been sent to ${formData.email}.`);
    };
    const verifyToken = async (token) => {
        let { status, msg } = await handleApiToVerifyToken(token);
        if (status === "Err") return;
        setOTPEmail(msg.userEmail);
        if (msg?.isVerified === false) {
            setIsAccountVerified(0);
            return;
        }

        if (document.cookie && document.cookie.includes("session-token")) {
            navigate({
                pathname: "/",
            });
            return;
        }

        navigate({
            pathname: msg.hasPin === true ? "/login/enterPin" : "/login/setPin",
            search: new URLSearchParams({
                email: msg.userEmail,
            }).toString(),
        });
    };
    const responseGoogle = async (authResult) => {
        try {
            if (!authResult.code) throw "Code not found";
            setIsLoading(true);
            let { status, msg } = await handleApiToAuthenticateGoogleCode(
                authResult.code
            );
            setIsLoading(false);
            if (status === "Err") {
                setResponseErr(msg);
                return;
            }

            figureOutRedirection(msg);
        } catch (err) {
            console.log("Google code err:", err);
            setResponseErr("Failed to process emails");
        }
    };

    const loginViaGoogle = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
        redirect_uri: prodURL,
    });

    const handleAboutUs = () => {
        navigate({
            pathname: "/aboutUs"
        });
    }
    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN))
            verifyToken(localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN));
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <nav className="px-8 flex justify-between border rounded-b-lg border-gray-300">
                <img
                    className="rounded-md my-2"
                    src={logo}
                    alt="Logout"
                    width={125}
                ></img>
                <div className="flex items-center gap-8 text-teal-800 text-lg font-semibold font-mono">
                    <div className="hover:cursor-pointer hover:text-xl transition-all ease-in-out" onClick={handleAboutUs}>About Us</div>
                    <Tooltip.Provider delayDuration={10}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <div className="hover:cursor-pointer hover:text-xl transition-all ease-in-out">
                                    Contact Us
                                </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content 
                                    className="bg-white text-teal-900 text-sm rounded-lg px-4 py-2 border-2"
                                    side="top"
                                    align="center"
                                >
                                    Email: nishitmangal5@gmail.com
                                    <Tooltip.Arrow className="fill-teal-900" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </div>
            </nav>

            <div className="flex flex-1 flex-col justify-center items-center bg-teal-50">
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
                {isLoading && (
                    <div className="items-center my-2 font-light text-xs">Loading...</div>
                )}
                <div className="m-12 flex flex-col sm:flex-row justify-center max-w-3xl">
                    <div className="flex flex-col justify-start sm:w-5/12 p-5 bg-teal-700 border rounded-lg out">
                        <div className="text-2xl font-sans font-semibold text-left text-teal-200">
                            Welcome to
                        </div>
                        <div className="text-5xl font-serif font-bold text-white">
                            NIVESH
                        </div>
                        <div className="my-4 flex justify-center items-center">
                            <img
                                src={wizard}
                                alt="Wizard"
                                width={160}
                                className="bg-teal-50 "
                            ></img>
                        </div>
                        <div className="text-base font-mono font-semibold text-teal-200">
                            Aapka apna
                        </div>
                        <div className="text-3xl font-serif font-bold text-teal-50">
                            Portfolio Manager
                        </div>
                    </div>
                    <GoogleOAuthProvider>
                        <div className="flex flex-col justify-center sm:w-7/12 p-8 bg-white shadow-teal-600 border rounded-lg">
                            {isAccountVerified === -1 && (
                                <div>
                                    <div className="text-2xl font-sans font-semibold">Log in</div>
                                    <button
                                        className="flex items-center mt-6 mb-4 h-10 w-full px-4 bg-teal-600 text-white text-base font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                                        onClick={loginViaGoogle}
                                    >
                                        <img
                                            className="rounded-sm mr-2"
                                            src={googleImg}
                                            alt="Google"
                                            height={25}
                                            width={25}
                                        ></img>
                                        <div className="text-center w-full">Login with Google</div>
                                    </button>
                                    <hr></hr>

                                    <form onSubmit={handleSubmit} className="pt-1" method="post">
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
                                                className="font-serif text-xs mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                                required
                                            />
                                        </div>

                                        {/* Password Input */}
                                        <div className="form-group mt-1 mr-1">
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
                                                className="text-xs mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                                                required
                                            />
                                        </div>
                                        <div
                                            className="text-xs mt-1 text-teal-600 font-medium hover:cursor-pointer font-sans"
                                            onClick={handleForgotPassword}
                                        >
                                            Forgot your password?
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="mt-4 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                                        >
                                            Login
                                        </button>
                                    </form>
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
                    </GoogleOAuthProvider>
                </div>
                <div className="text-teal-900 font-bold"> Made with ❤️ by Nishit in 🇮🇳</div>
            </div>
        </div>
    );
};
