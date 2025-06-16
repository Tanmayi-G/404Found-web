const UserCard = ({ user }) => {
  console.log(user);

  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;

  return (
    <div className="card bg-amber-400 w-80 shadow-sm pt-5 text-black">
      <figure>
        <img src={photoUrl} alt="photo" className="h-70 w-70 rounded" />
      </figure>
      <div className="card-body">
        <div className="flex items-baseline justify-between -mt-3">
          <h2 className="card-title font-bold text-2xl ">{firstName + " " + lastName}</h2>
          {age && gender && <div className="text-[16px]">{age + ", " + gender}</div>}
        </div>
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 my-1">
            {skills.map((skill, index) => (
              <span key={index} className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        )}
        <p>{about}</p>

        <div className="card-actions justify-center space-x-2 mt-1 -mb-12">
          <button className="btn btn-circle bg-red-600 border-0 w-11 h-11 mx-2 text-white transform transition duration-200 hover:scale-120 hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button className="btn btn-circle bg-green-600 border-0 w-11 h-11 mx-2 text-white transform transition duration-200 hover:scale-120 hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
