import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      //Handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="my-10 text-center">
        <h1 className="font-bold text-3xl text-amber-500">Connections</h1>
        {connections?.length === 0 && (
          <div className="mt-45">
            <p className="text-lg text-gray-500 mb-2">You do not have any connections yet!</p>
            <p className="text-base text-gray-500">Send a request to get started.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="my-10 text-center">
      <h1 className="font-bold text-3xl text-amber-500">Connections</h1>

      <ul className="list bg-base-300 m-4 p-4 rounded-lg shadow-md w-1/2 mx-auto">
        {connections.map((connection, index) => {
          const { firstName, lastName, age, gender, about, photoUrl, skills } = connection;

          return (
            <li key={index} className="list-row">
              <div>
                <img className="size-20 rounded-box" src={photoUrl} />
              </div>
              <div className="text-left mx-4">
                <div className="text-lg font-bold">
                  {firstName} {lastName}
                </div>
                <p className="mb-1">
                  {age}
                  {gender && gender !== "" ? `, ${gender}` : ""}
                </p>
                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <p className="list-col-wrap">{about}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
