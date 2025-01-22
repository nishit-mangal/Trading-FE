import { useState } from "react";
import { handleApiToSetSecret } from "../apiHandler";
import { localPort } from "../constants";
import { Logout } from "./Logout";

export const ApiPage = ({ setShowApiPage, userId }) => {
    const [responseErr, setResponseErr] = useState();    
    const [formData, setFormData] = useState({
        apiSecret: "",
        apiKey: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let reqData = {
            userId,
            apiSecret: formData.apiSecret,
            apiKey: formData.apiKey
        }
        let {status, msg} = await handleApiToSetSecret(reqData);
        if (status === "Err") {
            setResponseErr(msg);
            return;
        }
        setResponseErr(null);
        setShowApiPage(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen fixed top-0 left-0 w-full h-full bg-teal-50/50 backdrop-blur-sm z-10">
            {responseErr && (
                <div className="text-red-700 font-light font-serif text-base mt-1 mb-4">
                    {responseErr}
                </div>
            )}
            <div className="flex flex-col justify-evenly w-full max-w-sm p-8 bg-white shadow-teal-600 shadow-lg rounded-lg ">
                <div className="flex justify-between">
                    <div className="text-2xl font-sans font-semibold">Enter API details</div>
                    <Logout />
                </div>

                <div className="text-xs font-serif text-gray-700 mt-2">
                    <span className="text-sm text-red-700 font-bold"> Important Note: </span>
                    <div>
                        <span>You must set this as your redirect URL -  </span>
                        <span className="text-black text-sm font-extrabold">{localPort}/accessToken</span>
                    </div>                     
                </div>

                <form onSubmit={handleSubmit} className="pt-2" method="post">
                    <div className="form-group mt-2">
                        <label
                            htmlFor="apiSecret"
                            className="block text-xs font-medium text-gray-500"
                        >
                            Api Secret
                        </label>
                        <input
                            type="text"
                            id="apiSecret"
                            name="apiSecret"
                            value={formData.apiSecret}
                            onChange={handleChange}
                            className="font-serif text-xs mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>

                    <div className="form-group mt-2 mr-1">
                        <label
                            htmlFor="apiKey"
                            className="block text-xs font-medium text-gray-500"
                        >
                            Api Key
                        </label>
                        <input
                            type="text"
                            id="apiKey"
                            name="apiKey"
                            value={formData.apiKey}
                            onChange={handleChange}
                            className="text-xs mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        // disabled = {isDisabled}
                        className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Submit API Details
                    </button>
                </form>

            </div>
        </div>
    )
}