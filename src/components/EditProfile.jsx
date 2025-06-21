import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, photoUrl, about, skills, age, gender }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center mb-10 mt-3">
      <div className="flex justify-evenly mx-10">
        <fieldset className="fieldset bg-base-300 border-base-400 rounded-box border p-4 px-6 w-[500px] sm:w-[600px]">
          <legend className="fieldset-legend text-xl text-amber-400 font-bold">Edit your profile</legend>

          <label className="label text-sm">First Name:</label>
          <input type="text" className="input w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label className="label text-sm">Last Name:</label>
          <input type="text" className="input w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label className="label text-sm">Age:</label>
          <input type="text" className="input w-full" value={age} onChange={(e) => setAge(e.target.value)} />

          <label className="label text-sm">Gender:</label>
          <select className="input text-sm w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="">Prefer not to say</option>
          </select>

          <label className="label text-sm">About:</label>
          <textarea className="textarea w-full" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>

          <label className="label text-sm">Skills:</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input flex-1"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents form submission
                  if (newSkill.trim() && !skills.includes(newSkill.trim())) {
                    setSkills([...skills, newSkill.trim()]);
                    setNewSkill("");
                  }
                }
              }}
              placeholder="Enter a skill"
            />

            <button
              type="button"
              className="btn bg-amber-400 text-black"
              onClick={() => {
                if (newSkill.trim() && !skills.includes(newSkill.trim())) {
                  setSkills([...skills, newSkill.trim()]);
                  setNewSkill("");
                }
              }}
            >
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-white text-black text-sm font-medium px-2 py-1 rounded-full shadow-sm">
                  {skill}
                  <button type="button" className="ml-1 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => setSkills(skills.filter((_, i) => i !== index))}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="label text-sm">Photo URL:</label>
          <input type="text" className="input w-full" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

          {error && <div className="text-red-500 mt-2 -mb-2">{error}</div>}

          <div className="flex justify-end">
            <button onClick={saveProfile} className="btn bg-amber-400 text-black mt-3 w-fit">
              Save Profile
            </button>
          </div>
        </fieldset>
      </div>
      <div className="mx-10 mt-20">
        <UserCard user={{ firstName, lastName, photoUrl, about, skills, age, gender }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert border-0 bg-green-600 text-white text-base font-bold">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
