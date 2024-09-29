import { useEffect, useState } from "react";
import { handleApiToGenerateAccessCode } from "../apiHandler";

export const AccessToken = () => {
  const [code, setCode] = useState("");

  const generateAccessToken = async ()=>{
    let response = await handleApiToGenerateAccessCode(code)
    if(!response)
        alert('Access Code Not generated Successfully')
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get("code"));
    if(code!=='')
        generateAccessToken(code)
  }, [code]);
  return (
    <>
      <div>AccessToken Page</div>
    </>
  );
};
