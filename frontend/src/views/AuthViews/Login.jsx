import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonState, setButtonState] = useState(false)
    const navigate = useNavigate();
    const { user_login } = useAuth();
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const triggerSuccessToast = () => {
      setMessage("Login Successful");
      setType("success");
    };

    const triggerInvalidToast = () => {
      setMessage("Invalid Login Credentials");
      setType("info");
    };

    const triggerErrorToast = () => {
      setMessage("An Error Occurred, Please Try Again");
      setType("error");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setButtonState(true);
        const success = await user_login(email, password); 
        if (success) {
          triggerSuccessToast();
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          triggerErrorToast();
          setButtonState(false);
        }     
      } catch (error) {
        console.log(error)
        triggerErrorToast();
        setButtonState(false);
      }
    };
    
  return (
    <>
      <section className="w-full h-[100dvh] bg-primary_theme sm:pt-4">
        <div className="w-full lg:w-[70%] h-[100dvh] sm:h-[95vh] mx-auto block sm:flex flex-row p-3 shadow-2xl bg-primary_theme">
          <div className="w-full sm:w-1/2 h-[30dvh] sm:h-full order-last">
            <img
              className="w-full h-full object-cover rounded-md "
              src="assets/auth.png"
              alt=""
            />
          </div>
          <div className="w-full h-[65dvh] sm:h-full sm:w-1/2 p-0 sm:p-4 text-white ">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-full text-center pb-4 pt-8">
                <h1 className="text-3xl text-text_theme font-semibold">Login Your Account.</h1>
                <p className="text-base text-text_theme font-medium">Welcome back!</p>
              </div>
              <form onSubmit={handleSubmit} className="w-[90%] flex flex-col gap-3">
                <div className="block">
                  <label htmlFor="emailAddress" className="text-text_theme">Email Address</label>
                  <input
                    placeholder="example: you@email.com"
                    className="w-full mt-2 py-3 px-2 border border-black text-black rounded-lg focus:outline-none focus:border-black"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                </div>
                <div className="block">
                  <label htmlFor="password" className="text-text_theme">Password</label>
                  <input
                    placeholder="enter your password"
                    className="w-full mt-2 py-3 px-2 border border-black text-black rounded-lg"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={buttonState}
                  className="py-3 mt-4 mb-5 rounded-full border-2 border-blue-600 bg-blue-600 hover:text-white"
                >
                  {buttonState ? "Loading..." : "Login"}
                </button>
                <Toasts message={message} type={type} />
              </form>

              {/*  forgot password ?*/}
              <p className="text-center text-gray-900 text-base pt-3">
                Forgot password?{" "}
                <span className="text-text_theme hover:text-blue-600">
                  {" "}
                  <a href="/reset">Change password.</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
