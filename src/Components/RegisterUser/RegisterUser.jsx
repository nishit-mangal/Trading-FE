import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleApiToRegisterUser } from '../../apiHandler';
import {  } from "module";
import { Otp } from "../Otp";

function RegisterUser() {
  const navigate = useNavigate();

  // State to hold form inputs
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: "",
    email: '',
    password: '',
    reEnterPasword: ""
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [responseErr, setResponseErr] = useState();
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  // State to hold submission status
  
  const handleLogIn = () =>{
    navigate("/login");
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(formData.password!==formData.reEnterPasword){
      setIsPasswordMatch(false);
      return;
    }
    
    if(formData.phoneNumber!=="" && !(/^\d+$/.test(formData.phoneNumber))){
      setIsValidPhoneNumber(false);
      return;
    }

    setIsPasswordMatch(true);
    setIsValidPhoneNumber(true);

    let reqObj = {
      username:formData.name,
      password:formData.password,
      email: formData.email,
      phoneNumber:formData.phoneNumber
    }
    // Set the submitted state to true
    let {status, msg} = await handleApiToRegisterUser(reqObj);
    if(status==="Err"){
      setResponseErr(msg);
      return;
    }
    setResponseErr(null);
    setShowOTPScreen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-teal-50">
      
      {responseErr && <div className='text-red-700 font-light font-serif text-base mt-1 mb-4'>{responseErr}</div>}
      
      <div className="flex flex-col justify-evenly w-full max-w-sm p-8 bg-white shadow-teal-600 shadow-lg rounded-lg">
        {!showOTPScreen && <div>
          <div className="text-2xl font-sans font-semibold">Register User</div>

          <form onSubmit={handleSubmit} className="pt-2">
            <div className='flex justify-between'>
              {/* Name Input */}
              <div className="form-group mt-2 mr-1">
                <label htmlFor="name" className="block text-xs font-medium text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="font-serif text-xs mt-1 h-8 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="form-group mt-2 ml-1">
                <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-500">
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  maxLength="10"
                  minLength="10"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="font-serif text-xs mt-1 h-8 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
                {!isValidPhoneNumber && <div className='text-red-700 font-light font-serif text-xs mt-1'>Invalid Phone Number</div>}
              </div>
            </div>

            {/* Email Input */}
            <div className="form-group mt-2">
              <label htmlFor="email" className="block text-xs font-medium text-gray-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="font-serif text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className='flex justify-between'>
              <div className="form-group mt-2 mr-1">
                <label htmlFor="password" className="block text-xs font-medium text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="form-group mt-2 ml-1">
                <label htmlFor="reEnterPasword" className="block text-xs font-medium text-gray-500">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  id="reEnterPasword"
                  name="reEnterPasword"
                  value={formData.reEnterPasword}
                  onChange={handleChange}
                  className="text-xs mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
            </div>
            {!isPasswordMatch && <div className='text-red-700 font-light font-serif text-xs mt-1'>Passwords did not Match</div>}
            
            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 h-8 w-full px-4 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                Register
            </button>
          </form>

          <div className='text-xs text-center mt-3'>
            Already have an account?
            <span className='ml-2 text-teal-700 font-bold hover:cursor-pointer font-sans' onClick={handleLogIn}>
              Log In
            </span> 
          </div>
        </div>
        }
        
        {showOTPScreen && <Otp email={formData.email} setResponseErr={setResponseErr} page="Signup" />}

      </div>
      
    </div>
  );
}

export default RegisterUser;
