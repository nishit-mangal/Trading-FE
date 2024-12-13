import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE } from "../constants";
import { handleApiToVerifyToken } from "../apiHandler";
import { useEffect, useState } from "react";

export const Protected = ({ children }) => {
    const [searchParams, setSearchParams] = useState(""); // null for loading state
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        verifyToken();
    }, []);

    const verifyToken = async () => {
        const token = localStorage.getItem(LOCAL_STORAGE.USER_LOGIN_TOKEN);
        if (!token) {
            setRedirectPath("/login");
            return;
        }

        let { status, msg } = await handleApiToVerifyToken(token);
        if (status === "Err" || msg?.isVerified === false) {
            setRedirectPath("/login");
            return;
        }

        if (msg?.hasPin === false) {
            setRedirectPath("/login/setPin");
            setSearchParams(new URLSearchParams({
                email: msg.userEmail
            }).toString())
            return;
        }
        let cookie = document.cookie;
        if (msg?.hasPin === true && !cookie) {
            setRedirectPath("/login/enterPin");
            setSearchParams(new URLSearchParams({
                email: msg.userEmail
            }).toString())
            return;
        }

    }

    if (redirectPath) {
        return <Navigate to={{ pathname: redirectPath, search: searchParams }} replace />;
    }
    return children;
}