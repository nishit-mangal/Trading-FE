import { useState } from "react";
import closeImage from "../assets/close.png"
import { useRecoilValue } from "recoil";
import { userData } from "../store/atoms/userData";
import { handleApiToResetPassword } from "../apiHandler";
import { LOCAL_STORAGE } from "../constants";
import { useNavigate } from "react-router-dom";

export const ResetPassword = ({setShowPasswordComponent}) => {
    const data = useRecoilValue(userData);
    const navigate = useNavigate();
    const [responseErr, setResponseErr] = useState();    
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);  
    const [formData, setFormData] = useState({
        currPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.newPassword!==formData.confirmPassword){
            setIsPasswordMatch(false);
            formData.newPassword = "";
            formData.confirmPassword = "";
            return;
        }
        setIsPasswordMatch(true);
        let { status, msg } = await handleApiToResetPassword(data.userEmail, formData);    
        if (status === "Err") {
            setResponseErr(msg);
            return;
        }     
        localStorage.clear(LOCAL_STORAGE.USER_LOGIN_TOKEN);
        document.cookie = "session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    }

    const handleClose = () => {
        setShowPasswordComponent(false);
    }

    return (
         
        <div className="flex flex-col justify-center items-center min-h-screen fixed top-0 left-0 w-full h-full bg-teal-50 z-10">
            {responseErr && (
                <div className="text-red-700 font-light font-serif text-base mt-1 mb-4">
                    {responseErr}
                </div>
            )}
            <div className="flex flex-col justify-evenly w-full max-w-sm p-8 bg-white shadow-teal-600 shadow-lg rounded-lg">
                <div className="flex justify-between">
                    <div className="text-2xl font-sans font-semibold">Reset Password</div>
                    <button className="transition-transform duration-150 ease-in-out transform active:scale-90" onClick={handleClose}>
                        <img src={closeImage} alt="Logout" height={15} width={15} className="transition-transform duration-150 ease-in-out transform hover:scale-110"></img>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="pt-2" method="post">
                    {/* Email Input */}
                    <div className="form-group mt-2">
                        <label
                            htmlFor="currPassword"
                            className="block text-xs font-medium text-gray-500"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currPassword"
                            name="currPassword"
                            value={formData.currPassword}
                            onChange={handleChange}
                            className="font-serif text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-group mt-2 mr-1">
                        <label
                            htmlFor="newPassword"
                            className="block text-xs font-medium text-gray-500"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-group mt-2 mr-1">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-xs font-medium text-gray-500"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    {!isPasswordMatch && <div className='text-red-700 font-light font-serif text-xs mt-1'>Passwords did not Match</div>}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                    >
                        Reset Password
                    </button>
                </form>
                        
            </div>
        </div>
    )
}