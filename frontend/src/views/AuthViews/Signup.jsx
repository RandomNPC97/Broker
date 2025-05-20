import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";


function Signup() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [ref_code, setReferralCode] = useState("");
  const [phone_number, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [buttonState, setButtonState] = useState(false)
  const { user_signup } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      setReferralCode(code);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        console.log(response)
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const triggerSuccessToast = () => {
    setMessage("Signup SuccessFul");
    setType("success");
  };

  const triggerInvalidToast = () => {
    setMessage("Complete The Form");
    setType("info");
  };

  const triggerErrorToast = () => {
    setMessage("An Error Occurred, Please Try Again");
    setType("error");
  };


  const validateEmail = (email) => {
    // Regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setButtonState(true)
      try {
        const success = await user_signup(email, password, first_name, last_name, phone_number, country, confirmPassword, ref_code);
        if (success) {
          triggerSuccessToast();
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          triggerErrorToast();
        }
      } catch (error) {
        triggerErrorToast();
      }
      finally{
        setButtonState(false)
      }

      // clear the form fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPhone("");
      setCountry("");
      setConfirmPassword("");
    }
    else{
      triggerInvalidToast();
    }
  };

  return (
    <>
      <section className="h-[100dvh] w-full bg-primary_theme">
        <div className="w-full lg:w-[70%] h-[100dvh] mx-auto block sm:flex flex-row p-5 shadow-2xl bg-primary_theme">
          <div className="text-white w-full sm:w-1/2 h-full p-0 sm:p-4">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-full text-center pb-2 pt-0">
                <h1 className="text-2xl text-black font-semibold">Create Your Account.</h1>
                <p className=" text-base text-black font-medium">Signup today.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className='flex gap-2 w-full'>
                  <div className="block">
                    <label className='text-[12px] text-text_theme' htmlFor="firstname">First Name</label>
                    <input
                      placeholder="Enter First Name"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="block">
                    <label className='text-[12px] text-text_theme' htmlFor="lastname">Last Name</label>
                    <input
                      placeholder="Enter Last Name"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </div>                
                </div>

                <div className='block gap-2 w-full'>
                  <div className="block">
                    <label className='text-[12px] text-text_theme' htmlFor="email">Email Address</label>
                    <input
                      placeholder="Email"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  <div className="block">
                      <label className='text-[12px] text-text_theme' htmlFor="country-select">Country</label>
                      <select
                        className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                        id="country-select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      >
                      {countries.map((country) => (
                        <option key={country.name.common} value={country.name.common}>
                          {country.name.common} 
    
                        </option>
                      ))}
                      </select>
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <div className="block w-full">
                    <label className='text-[12px] text-text_theme' htmlFor="phoneNumber">Phone Number</label>
                    <input
                      placeholder="Enter Phone Number"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="text"
                      value={phone_number}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="block w-full">
                    <label className='text-[12px]'>Referral Code (optional)</label>
                    <input
                      placeholder="Referral Code"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="text"
                      value={ref_code}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 w-full">
                  <div className="block w-full">
                    <label className='text-[12px] text-text_theme' htmlFor="password">Password</label>
                    <input
                      placeholder="Enter Password"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="block w-full">
                    <label className='text-[12px] text-text_theme' htmlFor="confirmPass">Confirm Password</label>
                    <input
                      placeholder="Confirm Passowrd"
                      className="w-full mt-1 py-3 text-black border border-black px-2 rounded-lg"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={buttonState}
                  className="py-3 mt-4 mb-4 rounded-full border-2 border-blue-600 bg-blue-600 hover:text-white"
                >
                  {buttonState ? "Signing up...." : "Sign up"}
                </button>
                <Toasts message={message} type={type} />
              </form>
              <p className="text-center text-text_theme">
                Already have an account?{" "}
                <span className=" hover:text-secondary_theme2">
                  {" "}
                  <Link to={"/login"}>Login here!</Link>
                </span>
              </p>
            </div>
          </div>
          <div className="w-full hidden sm:w-1/2 sm:block h-[380px] sm:h-full">
            <img
              className="w-full h-full object-cover rounded-md "
              src="./assets/auth.png"
              alt=""
            />
          </div>
        </div>
      </section>

    </>
  );
}

export default Signup;



//{country.idd.root}{country.idd.suffixes}