import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE } from "../constants"
import logoutImage from "../assets/logout.png"   
export const Logout = () =>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.clear(LOCAL_STORAGE.USER_LOGIN_TOKEN);
        document.cookie = "session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
    }
    return (
        <div className="flex flex-col justify-center">
            <button className="transition-transform duration-150 ease-in-out transform active:scale-90" onClick={handleLogout}>
                <img src={logoutImage} alt="Logout" height={20} width={20} className="transition-transform duration-150 ease-in-out transform hover:scale-110"></img>
            </button>
        </div>
    )
}