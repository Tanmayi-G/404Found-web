import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const plans = [
  {
    name: "Basic",
    type: "basic",
    price: "$0/mo",
    features: ["100 connection requests per day", "Validity: Lifetime", "Basic support"],
    disabledFeatures: ["Verified account badge", "Chat with connections"],
    popular: false,
  },
  {
    name: "Premium 💎",
    type: "premium",
    price: "$29/mo",
    features: ["Infinite connection requests per day", "Validity: 1 year", "Verified account badge", "Chat with connections"],
    disabledFeatures: [],
    popular: true,
  },
];

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [membershipType, setMembershipType] = useState("basic");
  const navigate = useNavigate();

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verifyPayment", { withCredentials: true });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
    setMembershipType(res.data.membershipType);
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handlePremiumClick = async (planType) => {
    try {
      //make api call to create order
      const order = await axios.post(
        BASE_URL + "/payment/createOrder",
        {
          membershipType: planType,
        },
        { withCredentials: true }
      );

      const { keyId, amount, currency, orderId, notes } = order.data;

      //open up razorpay payment dialog box
      var options = {
        key: keyId,
        amount,
        currency,
        name: "404 Found",
        description: "Build your network",
        image: "/favicon.png",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: `${notes.emailId}`,
        },
        theme: {
          color: "#FFB900",
        },
        handler: verifyPremiumUser,
      };

      var rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert("❌ Payment failed. Please try again or use a different method.");
      });

      rzp1.open();
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return isUserPremium ? (
    <div className="flex flex-col items-center justify-center px-4 py-10 mt-10">
      <div className="relative card w-full max-w-md bg-base-300 shadow-xl border border-base-300 ">
        <div className="absolute -top-3 -right-3 z-100">
          <div className="bg-amber-400 text-amber-900 px-6 py-2 text-sm font-bold transform rotate-12 shadow-lg">Premium Active</div>
        </div>

        <div className="card-body flex flex-col h-full p-10">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">💎</div>
            <h2 className="text-2xl font-bold">{membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} Member</h2>
            <p className="text-base-content/70 text-sm mt-1">You're all set with premium features!</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Your Premium Benefits:</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 flex-shrink-0 mt-0.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Infinite connection requests per day</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 flex-shrink-0 mt-0.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Verified account badge</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 flex-shrink-0 mt-0.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Chat with connections</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 flex-shrink-0 mt-0.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Valid until: January 2026</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 mt-3">
            <button onClick={() => navigate("/")} className="btn btn-block bg-amber-400 text-black transition duration-300 hover:scale-105">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 px-4 py-10 mt-16">
      {plans.map((plan, idx) => (
        <div key={idx} className={`relative card w-full max-w-sm bg-base-300 shadow-lg border border-base-300 ${plan.popular ? "ring ring-amber-400 ring-offset-1" : ""}`}>
          {plan.popular && (
            <div className="absolute -top-3 -right-3 z-10">
              <div className="bg-amber-400 text-amber-900 px-6 py-2 text-sm font-bold transform rotate-12 shadow-lg">Most Popular</div>
            </div>
          )}

          <div className="card-body flex flex-col h-full p-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <span className="text-lg font-semibold">{plan.price}</span>
            </div>

            <ul className="flex flex-col gap-2 text-sm flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 flex-shrink-0 mt-0.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
              {plan.disabledFeatures.map((feature, i) => (
                <li key={i} className="opacity-50 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 flex-shrink-0 mt-0.5 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="line-through">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                onClick={() => (plan.type.toLowerCase() === "basic" ? navigate("/") : handlePremiumClick(plan.type))}
                className="btn btn-block bg-amber-400 text-black transition duration-300 hover:scale-105"
              >
                {plan.type.toLowerCase() === "basic" ? "Get Started" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Premium;
