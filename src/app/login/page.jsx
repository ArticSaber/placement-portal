"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + "/api/login", {
      cache: "no-store",
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        Email: credentials.Email,
        Password: credentials.Password,
      }),
    });
    const data = await response.json();
    if (response.status > 399 && response.status < 499) {
      toast.error(data?.message, { autoClose: 3000 });
    } else {
      toast(data?.message, { autoClose: 1000 });
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <span style={{ fontWeight: "800" }}>Login</span> to continue...
        </div>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              style={{ color: "black" }}
              name="email"
              type="email"
              onChange={(e) =>
                setCredentials({ ...credentials, Email: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              style={{ color: "black" }}
              name="password"
              type="password"
              onChange={(e) =>
                setCredentials({ ...credentials, Password: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>
        </div>
        <div>{/* <a href="/reset">Password Reset?</a> */}</div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
