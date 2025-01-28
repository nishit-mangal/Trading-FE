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
      className="flex flex-col justify-between items-center p-2 rounded-xl hover:bg-[rgba(20,150,150,0.2)] hover:cursor-pointer"
    >
      <img src={accessToken} alt="accessToken image" height={30} width={30}></img>
      <div className="font-medium w-[90px] text-center" style={{ fontSize: "8px" }}>
        Generate Access Token
      </div>
    </a>
  );
};
