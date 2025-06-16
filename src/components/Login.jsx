import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
      console.log(err);
    }
  };

  return (
    <div className="flex justify-evenly mt-10">
      <div className="relative">
        <img src="/login-bg.svg" alt="Abstract illustration" className="h-[70vh] opacity-30" />

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

      <div className="flex justify-center h-full pt-25">
        <div className="card bg-amber-400 text-black w-96 shadow-sm rounded-4xl p-5">
          <div className="card-body">
            <h2 className="card-title justify-center mb-5 text-xl">Login to continue</h2>
            <div className="pb-1">
              <label className="input bg-white rounded-4xl w-full">
                <svg className="h-[1em] opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input type="text" required placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
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
            <div className="card-actions justify-center">
              <button className="btn btn-active w-full rounded-4xl transition duration-300 transform hover:scale-105 hover:shadow-lg" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
