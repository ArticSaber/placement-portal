"use client";
import { BASE_URL } from "@/config";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + "/api/signup", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.success) {
      router.push("/login");
    }
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-row select-none bg-white text-black">
      <div
        className="flex flex-col relative bg-no-repeat h-[100vh] object-cover w-[40%] "
        style={{
          backgroundImage: "url('/login-bg.jpg')",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col items-center absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black h-[100%] justify-around">
          <div className="flex flex-col justify-center items-center text-white gap-5">
            <div className="flex justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="132"
                height="132"
                viewBox="0 0 132 132"
                fill="none"
              >
                <path
                  d="M38.0208 72.5833C37.955 70.2791 39.0083 68.0408 40.7858 66.5266C45.7233 67.58 50.3317 69.6208 54.4792 72.5833C54.4792 77.06 50.7925 80.7466 46.25 80.7466C41.7075 80.7466 38.0867 77.1258 38.0208 72.5833ZM77.5208 72.5833C81.6683 69.6866 86.2767 67.6458 91.2142 66.5925C92.9917 68.1066 94.045 70.345 93.9792 72.5833C93.9792 77.1916 90.2925 80.8783 85.75 80.8783C81.2075 80.8783 77.5208 77.1916 77.5208 72.5833ZM66 46.25C47.7642 45.9866 29.7917 50.5291 13.7942 59.4166L13.3333 66C13.3333 74.0975 15.2425 82.0633 18.8633 89.305C50.1083 84.5553 81.8917 84.5553 113.137 89.305C116.757 82.0633 118.667 74.0975 118.667 66L118.206 59.4166C102.255 50.5362 84.2541 45.9961 66 46.25ZM66 0.166626C74.6453 0.166626 83.206 1.86946 91.1933 5.17789C99.1806 8.48632 106.438 13.3356 112.551 19.4488C118.664 25.562 123.514 32.8194 126.822 40.8066C130.13 48.7939 131.833 57.3546 131.833 66C131.833 83.46 124.897 100.205 112.551 112.551C100.205 124.897 83.4601 131.833 66 131.833C57.3546 131.833 48.7939 130.13 40.8067 126.822C32.8194 123.514 25.562 118.664 19.4488 112.551C7.10265 100.205 0.166656 83.46 0.166656 66C0.166656 48.5399 7.10265 31.7949 19.4488 19.4488C31.7949 7.10262 48.5399 0.166626 66 0.166626Z"
                  fill="white"
                />
              </svg>
              <span className="text-5xl p-3 font-bold">Ninja Hire</span>
            </div>
            <span className="text-3xl p-3 font-bold text-white">
              University Recruiting Platform
            </span>
            <span className="text-ld p-3 font font-normal text-gray-500">
              Campus Recruitment made easy
            </span>
          </div>
          <div>
            <div className="flex justify-center items-center gap-2 text-gray-500">
              TRUSTED BY THE BEST UNIVERSITIES AND EMPLOYERS
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => handleSignup(e)}
        className="flex justify-center items-center flex-col bg-clip-padding bg-opacity-10 bg-white rounded-md shadow-md h-[100vh] w-[60%] "
      >
        <div className="flex flex-col p-[1rem] gap-3 w-[50%]">
          <div className=" flex flex-col justify-center border-black-4 gap-6 text-gray-500">
            <span className="text-5xl ">Sign up</span>{" "}
            <span className="text-3xl">Enter your details below</span>
          </div>
          <label htmlFor="email" className="text-gray-500">
            Email
          </label>
          <input
            className="border-2 border-gray p-2 rounded-md"
            name="email"
            type="email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="Enter email"
          />
          <label htmlFor="password" className="text-gray-500">
            Password
          </label>
          <input
            className="border-2 border-gray p-2 rounded-md"
            name="password"
            type="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Enter password"
          />
          <label>Role</label>
          <select
            className="border-2 border-gray p-2 rounded-md"
            name="role"
            onChange={(e) =>
              setCredentials({ ...credentials, role: e.target.value })
            }
          >
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <div>
            <button
              type="submit"
              className="w-[100%] bg-[#4E99EC] text-white p-2 rounded-md shadow-md "
            >
              Sign up
            </button>
            <div>
              <div className="flex gap-2 text-gray-500 mt-3">
                Already have an account?
                <a href="/login" className="text-blue-500">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
