import { useEffect, useState } from "react";
import { handleApiToGenerateAccessCode } from "../apiHandler";
import { LOCAL_STORAGE, prodURL } from "../constants";

export const AccessToken = () => {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState();

  const generateAccessToken = async () => {
    let response = await handleApiToGenerateAccessCode(code, userId);
    if (!response){
      alert("Access Code Not generated Successfully");
      return;
    } 
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, response);
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
    <>
      <div>The access token is generated successfully. You may close this page.</div>
      <div>Refresh the page.</div>
    </>
  );
};
