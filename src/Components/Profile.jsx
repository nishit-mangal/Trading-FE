import { useRecoilValue } from "recoil";
import { userData } from "../store/atoms/userData";

export const Profile = () => {
    const data = useRecoilValue(userData);
    
    return(
        <>
            <div className="flex flex-col items-center justify-center h-12 pb-1 rounded-sm box-border hover:border-b-2 border-teal-700 hover:cursor-pointer" onClick={() => setShowOrderHistory(true)}>
                <img 
                    src={data.profileImg} 
                    alt="Profile Image"
                    width={35}
                    className="rounded-full p-1"
                >
                </img>
                <button
                className="font-medium"
                style={{ fontSize: "8px" }}
                >
                {data.userName?.split(" ")[0]}
                </button>
            </div>
        </>
    )
}