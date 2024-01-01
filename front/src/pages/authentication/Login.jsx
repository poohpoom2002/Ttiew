import "./Login.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillCloseCircle,
} from "react-icons/ai";

const Login = () => {
  const [text, setText] = useState(" ");
  const [showIcon, setShowIcon] = useState(false);

  const userIncorrect = () => {
    // เรียกใช้ตอนล็อคอินไม่ผ่าน

    setShowIcon(true);
    setText("Username or Password Incorrect");
  };

  function handleKeyDown(event) {
    if (event.keyCode === 32) {
      // keyCode for spacebar is 32
      event.preventDefault();
    }
  }

  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordClick = () => {
    setInputType(showPassword ? "password" : "text");
    setShowPassword(!showPassword);
  };

  // เชื่อม api

  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  async function Login() {
    console.log('fetch data login')
    try {
      console.log(userLogin)
      const res = await axios.post("http://localhost:3000/auth/login", {
        username:userLogin.username,password:userLogin.password});

      Object.entries(res.data).forEach(([key, value]) => {
        console.log(key, value.toString());
        localStorage.setItem(key, value.toString());

        console.log("Logged in as:", userLogin.username);
        setTimeout(() => {
        return navigate("/Page");
        }, 1500);

      });
    } catch (error) {
      console.log("Username or Password Incorrect");

      userIncorrect();
    }
  }

  return (
    <div className="w-screen h-screen LOGIN">
      <div className="flex m-auto wrapper absolute bg-white rounded-lg  w-1/2 font-Mitr">
        <div class="container mx-auto grid grid-cols-2 ">
          <div class="px-10 py-10">
            <div class="text-4xl pt-5 pb-3 text-start text-black">Login</div>
            <div class="text-xl text-start pb-4 text-[#999999]">
              Welcome! Please login to your account.
            </div>
            <form class="formTextLogin text-[#999999]">
              <label className="block mb-2 mt-7">E-mail</label>
              <input
                className="text-black bg-[#e1f6f6] w-full p-2 rounded-lg border-none"
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    username: e.target.value,
                  });
                }}
                type="username"
                maxLength="10"
                onKeyDown={handleKeyDown}
                placeholder=""
              />
              <label className="block mb-2 mt-7">Password</label>
              <div className="relative">
                <input
                  className="text-black bg-[#e1f6f6] w-full p-2 rounded-lg border-none"
                  onChange={(e) => {
                    setUserLogin({
                      ...userLogin,
                      password: e.target.value,
                    });
                  }}
                  type={inputType}
                  onKeyDown={handleKeyDown}
                  placeholder=""
                />
                <span
                  onClick={handlePasswordClick}
                  className="absolute inset-y-0 right-[20px] flex items-center pl-2 cursor-pointer"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
            </form>

            <div class="flex text-start py-4 text-red-500">
              <span className="mt-1">{showIcon && <AiFillCloseCircle />}</span>
              <span className="ml-2">{text}</span>
            </div>
            <div class="pb-5">
              <button
                className="block w-full p-3 mt-4 rounded-full cursor-pointer text-white border-none m-auto bg-[#02c4c3] hover:bg-[#018d8d] START"
                onClick={Login}
              >
                Login
              </button>
            </div>
            <div
              className="not-member"
              class="textNewUserLogin text-left text-[#999999] pt-3"
            >
              New User?{" "}
              <Link
                className="font-bold ml-2 underline decoration-1 text-[#02c4c3] "
                to="/signup"
              >
                Signup
              </Link>
            </div>
          </div>
          <div class="logoLogin bg-[#02c4c3] rounded-r-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;