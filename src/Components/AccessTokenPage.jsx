import { useEffect, useState } from "react";
import { handleApiToGenerateAccessCode } from "../apiHandler";
import { LOCAL_STORAGE, prodURL } from "../constants";

export const AccessToken = () => {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState();

  const generateAccessToken = async () => {
    let {token, responseMessage} = await handleApiToGenerateAccessCode(code, userId);
    if (!token){
      alert(responseMessage);
      return;
    } 
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
    window.location.href = prodURL;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get("code"));
    
    let fetchedUserId = window.location.search.split("userId=")[1];
    setUserId(fetchedUserId);
    
    if (code !== "") generateAccessToken();
  }, [code]);
  return (
    <div className="flex flex-col justify-start mt-8">
      <div>This is the access token page.</div>
      <div>Refresh the page.</div>
    </div>
  );
};
