"use client";
import React, { useContext, useState } from "react";
import loginSvg from "../../assets/loginUser.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { loginCheck } from "@/services/userService";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loginData);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data", {
        position: "top-center",
      });
      return;
    }
    try {
      const result = await loginCheck(loginData);
      console.log(result);
      toast.success("Log In Success", {
        position: "top-center",
      });
      context.setUser(result.user);
      router.push("/profile/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="grid grid-cols-12 justify-center">
      <div className="col-span-4 col-start-5 p-5 shadow-sm">
        <div className="m-5 flex justify-center">
          <Image
            src={loginSvg}
            style={{
              width: "40%",
            }}
            alt="Login Banner Image"
          />
        </div>
        <div className="py-5">
          <h1 className="text-3xl text-center">Login Here</h1>
          <form action="#!" className="mt-5" onSubmit={handleLogin}>
            {/* name */}
            <div className="mt-4">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter Your Email Here"
                name="user_email"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    email: event.target.value,
                  });
                }}
                value={loginData.email}
              />
            </div>
            {/* password */}
            <div className="mt-4">
              <label
                htmlFor="user_password"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter Your Password Here"
                name="user_password"
                onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    password: event.target.value,
                  });
                }}
                value={loginData.password}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-800 ms-3"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
