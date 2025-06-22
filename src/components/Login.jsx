import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = ({ isLogin: defaultIsLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(defaultIsLogin ?? true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-evenly items-center mt-10">
      <div className="relative">
        <img src={isLogin ? "/login-bg.svg" : "/signup-bg.svg"} alt="Abstract illustration" className="h-[70vh] opacity-30" />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white cursor-default">
            <span className="inline-block transition duration-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)] hover:scale-110 hover:text-cyan-400 hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]">
              Swipe.
            </span>{" "}
            <span className="inline-block transition duration-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)] hover:scale-110 hover:text-yellow-300 hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]">
              Connect.
            </span>{" "}
            <span className="inline-block transition duration-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)] hover:scale-110 hover:text-pink-400 hover:drop-shadow-[0_0_6px_rgba(255,105,180,0.5)]">
              Build.
            </span>
          </h1>

          <p className="text-xl text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] mt-5">Pair programming starts with a match!</p>
        </div>
      </div>

      <div className="flex justify-center h-full">
        <div className="card bg-amber-400 text-black w-96 shadow-sm rounded-4xl px-3 py-2">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">{isLogin ? "Welcome back!" : "Get started!"}</h2>
            <p className="card-title justify-center text-md mb-3">{isLogin ? "Login to continue" : "Create an account now"}</p>
            {!isLogin && (
              <>
                {" "}
                <div className="pb-1">
                  <label className="input bg-white rounded-4xl w-full">
                    <svg className="h-[1em] opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </g>
                    </svg>
                    <input type="text" required placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </label>
                </div>
                <div className="pb-1">
                  <label className="input bg-white rounded-4xl w-full">
                    <svg className="h-[1em] opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 11h10M7 15h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    </svg>
                    <input type="text" required placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </label>
                </div>{" "}
              </>
            )}
            <div className="pb-1">
              <label className="input bg-white rounded-4xl w-full">
                <svg className="h-[1em] opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 22" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v8z" />
                </svg>
                <input type="email" required placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
              </label>
            </div>
            <div className="pb-2">
              <label className="input bg-white rounded-4xl w-full">
                <svg className="h-[1em] opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <p className="text-red-600 font-semibold ">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-active w-full rounded-4xl transition duration-300 transform hover:scale-105 hover:shadow-lg mb-2" onClick={isLogin ? handleLogin : handleSignUp}>
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </div>
            {isLogin ? (
              <p className="text-center">
                Don't have an account?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    setIsLogin((value) => !value);
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-center">
                Already have an account?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    setIsLogin((value) => !value);
                    navigate("/login");
                  }}
                >
                  Log In
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
