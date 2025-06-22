import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;
  if (feed.length === 0) {
    return (
      <div className="my-10 mt-45 text-center">
        <p className="text-lg text-gray-500 mb-2">No new users available</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-14">
      {feed
        .slice(0)
        .reverse()
        .map((user, index) => (
          <UserCard key={user._id} user={user} index={index} total={feed.length} />
        ))}
    </div>
  );
};

export default Feed;
