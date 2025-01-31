import { useRecoilValue } from "recoil";
import { userData } from "../store/atoms/userData";
import { useEffect, useState } from "react";
import { prodURL } from "../constants";
import accessToken from "../assets/keysIcon.svg"

export const GenerateAccessCode = () => {
  const data = useRecoilValue(userData);
  const [hrefUrl, setHrefUrl] = useState();
  const [redirectUrl, setRedirectUrl] = useState();

  useEffect(()=>{
    setHrefUrl(`https://api.upstox.com/v2/login/authorization/dialog?client_id=${data.apiKey}&redirect_uri=${redirectUrl}`);
  }, [data.apiKey, redirectUrl]);
  useEffect(()=>{
    setRedirectUrl(`${prodURL}/accessToken&state=code?userId=${data.userId}`)
  }, [data.userId]);
  return (
    <a
      href={hrefUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center h-12 pb-1 rounded-sm box-border hover:border-b-2 border-teal-700 hover:cursor-pointer"
    >
      <img src={accessToken} alt="accessToken image" height={35} width={35}></img>
      <div className="font-medium text-center" style={{ fontSize: "8px" }}>
        Generate Access Token
      </div>
    </a>
  );
};
