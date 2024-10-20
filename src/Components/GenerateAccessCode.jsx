export const GenerateAccessCode = () => {

  return (
    <>
      <div className="flex items-center ">
        <a
          className="bg-blue-500 text-white pr-5 pl-5 pt-2 pb-2 rounded-md hover:bg-blue-600 hover:cursor-pointer"
          href='https://api.upstox.com/v2/login/authorization/dialog?client_id=6146dafc-cc80-4cb7-98c5-c667566fd9b3&redirect_uri=http://localhost:5173/accessToken&state=code'
          target="_blank"
        >
          Generate Access Token
        </a>
      </div>
    </>
  );
};
