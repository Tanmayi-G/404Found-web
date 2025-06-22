import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(BASE_URL + `/request/review/${status}/${requestId}`, {}, { withCredentials: true });
      dispatch(removeRequest(requestId));
    } catch (err) {
      //handle errors
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      //handle errors
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="my-10 text-center">
        <h1 className="font-bold text-3xl text-amber-500">Connection Requests</h1>
        <div className="mt-45">
          <p className="text-lg text-gray-500 mb-2">No requests found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 text-center">
      <h1 className="font-bold text-3xl text-amber-500">Connection Requests</h1>

      <ul className="list bg-base-300 m-4 p-4 rounded-lg shadow-md w-2/3 mx-auto mt-7 mb-20">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = request.fromUserId;

          return (
            <li key={_id} className="list-row">
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
                {/* {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-3">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                )} */}
                <p className="list-col-wrap">{about}</p>
              </div>

              <div className="flex items-center">
                <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Accept
                </button>
                <button className="btn btn-primary mx-2 text-black" onClick={() => reviewRequest("rejected", request._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
