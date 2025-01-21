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
          className="bg-blue-500 text-white pr-5 pl-5 pt-2 pb-2 rounded-md hover:bg-blue-600 hover:cursor-pointer"
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
