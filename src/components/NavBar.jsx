import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-amber-400 shadow-sm">
      <div className="flex-1 ml-2">
        <img src="/404FoundLogo.png" className="h-18 py-1  btn btn-ghost transition duration-300 transform hover:scale-105 hover:shadow-lg" />
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="flex items-center">
            <p className="text-lg text-black">Welcome, {user.firstName}!</p>
            <div className="dropdown dropdown-end mx-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-14 h-14 transition duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="w-full h-full rounded-full ">
                  <img alt="profile photo" src={user.photoUrl} />
                </div>
              </div>

              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
