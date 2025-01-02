import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { handleApiToResetForgotPassword } from "../apiHandler";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const { userId, token } = useParams();
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [responseErr, setResponseErr] = useState();
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setIsPasswordMatch(false);
            formData.newPassword = "";
            formData.confirmPassword = "";
            return;
        }
        setIsPasswordMatch(true);
        
        let { status, msg } = await handleApiToResetForgotPassword(userId, token, formData);
        if (status === "Err") {
            setResponseErr(msg);
            return;
        }
        navigate("/login");
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-teal-50">

            {responseErr && <div className='text-red-700 font-light font-serif text-base mt-1 mb-4'>{responseErr}</div>}

            <div className="flex flex-col justify-evenly w-full max-w-sm p-8 bg-white shadow-teal-600 shadow-lg rounded-lg">
                <div>
                    <div className="text-2xl font-sans font-semibold">New Password</div>

                    <form onSubmit={handleSubmit} className="pt-2">
                        <div className="form-group mt-2 mr-1">
                            <label htmlFor="password" className="block text-xs font-medium text-gray-500">
                                Password
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

                        <div className="form-group mt-2">
                            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-500">
                                Re-enter Password
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

                        <button
                            type="submit"
                            className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}