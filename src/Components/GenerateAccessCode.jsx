import { useRecoilValue } from "recoil";
import { userData } from "../store/atoms/userData";
import { useEffect, useState } from "react";
import { prodURL } from "../constants";

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
    <>
      <div className="flex items-center ">
        <a
          className="p-2 rounded-xl hover:bg-[rgba(20,150,150,0.2)] hover:cursor-pointer text-sm font-medium"
          href={hrefUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Generate Access Token
        </a>
      </div>
    </>
  );
};
