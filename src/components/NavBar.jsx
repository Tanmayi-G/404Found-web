import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-amber-400 shadow-sm">
      <Link to="/" className="flex-1 ml-2">
        <img src="/404FoundLogo.png" className="h-18 py-1  btn btn-ghost transition duration-300 transform hover:scale-105 hover:shadow-lg" />
      </Link>

      <div className="flex gap-2">
        {user && (
          <div className="flex items-center">
            <Link to="/connections" className="mr-5 px-5 py-2 rounded-full bg-black text-amber-400 font-semibold text-sm shadow hover:scale-105 transition">
              My Connections
            </Link>

            <Link to="/requests" className="mr-7 px-5 py-2 rounded-full bg-black text-amber-400 font-semibold text-sm shadow hover:scale-105 transition">
              Requests
            </Link>

            <p className="text-lg text-black">
              Welcome, <span className="font-bold text-lg">{user.firstName}!</span>
            </p>

            <div className="dropdown dropdown-end mx-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-12 h-12 transition-transform duration-200 hover:scale-105">
                <div className="w-full h-full rounded-full ring ring-white ring-offset-2 ring-offset-amber-400">
                  <img alt="User Avatar" src={user.photoUrl} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-300 rounded-box mt-3 w-52 p-2 shadow-lg z-10">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge badge-sm bg-amber-500 border-none text-white">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-left w-full">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
