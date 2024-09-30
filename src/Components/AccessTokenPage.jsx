import { useEffect, useState } from "react";
import { handleApiToGenerateAccessCode } from "../apiHandler";
import { LOCAL_STORAGE } from "../constants";

export const AccessToken = () => {
  const [code, setCode] = useState("");

  const generateAccessToken = async () => {
    let response = await handleApiToGenerateAccessCode(code);
    if (!response){
      alert("Access Code Not generated Successfully");
      return;
    } 
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, response)
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get("code"));
    if (code !== "") generateAccessToken(code);
  }, [code]);
  return (
    <>
      <div>AccessToken Page</div>
    </>
  );
};
