"use client";
import { BASE_URL } from "@/config";
import { useState } from "react";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + "/api/signup", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: credentials.Email,
        password: credentials.Password,
      }),
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSignup(e)} className="flex items-center justify-center">
        <div>
          <span style={{ fontWeight: "800" }}>Sign Up </span> to continue...
        </div>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              //   className={`${styles.input} ${styles["input-misc"]}`}
              onChange={(e) =>
                setCredentials({ ...credentials, Email: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              //   className={`${styles.input} ${styles["input-misc"]}`}
              onChange={(e) =>
                setCredentials({ ...credentials, Password: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
