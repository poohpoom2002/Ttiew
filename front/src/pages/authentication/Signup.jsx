import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";
import axios from "axios";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillInfoCircle,
} from "react-icons/ai";

const SignUp = () => {
  const [text, setText] = useState(" ");
  const [showIcon, setShowIcon] = useState(false);

  const AlreadyUse = () => {
    // เรียกใช้ตอนชื่อซ้ำ

    setShowIcon(true);
    setText("This username is already in use");
  };

  const Reqiured = () => {
    // เรียกใช้ตอนกรอกไม่ครบ

    setShowIcon(true);
    setText("Please enter required info");
  };

  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordClick = () => {
    setInputType(showPassword ? "password" : "text");
    setShowPassword(!showPassword);
  };

  function handleKeyDown(event) {
    if (event.keyCode === 32) {
      // keyCode for spacebar is 32
      event.preventDefault();
    }
  }

  // เชื่อม api

  const navigate = useNavigate();
  const [signupUser, setSignupUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  async function SingUpHandler() {
    if (
      signupUser.username === "" ||
      signupUser.password === "" ||
      signupUser.phone === ""
    ) {
      console.log("Please enter reqiured info");
      Reqiured();
    } else {
      try {
        const res = await axios({
          url: "https://localhost:3000" + "/auth/signup",
          method: "POST",
          data: {
            email: signupUser.email,
            Password: signupUser.password,
            Phone: signupUser.phone,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Sign Up Successfully");
        setTimeout(() => {
          return navigate("/login");
        }, 2500);
      } catch (err) {
        console.log("This username is already in use");
        AlreadyUse();
      }
    }
  }

  return (
    <div className="w-screen h-screen SIGNUP">
      <div className="flex m-auto wrapper absolute bg-white rounded-lg  w-1/2 font-Mitr">
        <div class="container mx-auto grid grid-cols-2 ">
          <div class="px-10 py-10">
            <div class="text-4xl pt-5 pb-3 text-start text-black">
              Create new account
            </div>
            <form class="formTextSignup   text-[#999999]">
              <label className="block mb-2 mt-7">Name</label>
              <input
                className="text-black bg-[#fdf2c6] w-full p-2 rounded-lg border-none"
                onChange={(e) => {
                  setSignupUser({
                    ...signupUser,
                    username: e.target.value,
                  });
                }}
                type="name"
                maxLength="10"
                onKeyDown={handleKeyDown}
                placeholder=""
              />
              <label className="block mb-2 mt-7">Username</label>
              <input
                className="text-black bg-[#fdf2c6] w-full p-2 rounded-lg border-none"
                onChange={(e) => {
                  setSignupUser({
                    ...signupUser,
                    username: e.target.value,
                  });
                }}
                type="username"
                maxLength="10"
                onKeyDown={handleKeyDown}
                placeholder=""
              />
              <label className="block mb-2 mt-7">E-mail</label>
              <input
                className="text-black bg-[#fdf2c6] w-full p-2 rounded-lg border-none"
                onChange={(e) => {
                  setSignupUser({
                    ...signupUser,
                    username: e.target.value,
                  });
                }}
                type="email"
                maxLength="10"
                onKeyDown={handleKeyDown}
                placeholder=""
              />
              <label className="block mb-2 mt-7">Password</label>
              <div className="relative">
                <input
                  className="text-black bg-[#fdf2c6] w-full p-2 rounded-lg border-none"
                  onChange={(e) => {
                    setSignupUser({
                      ...signupUser,
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
              <span className="mt-1">{showIcon && <AiFillInfoCircle />}</span>
              <span className="ml-2">{text}</span>
            </div>
            <div class="pb-5">
              <button
                onClick={SingUpHandler}
                className="block w-full p-3 mt-4 rounded-full cursor-pointer text-white border-none m-auto bg-[#f39032] hover:bg-[#ce6d13] CREATE"
              >
                Create Account
              </button>
            </div>
            <div
              className="not-member"
              class="textNewUserSignup text-left text-[#999999] pt-3"
            >
              Already a member?
              <Link
                className="font-bold ml-2 underline decoration-1 text-[#f39032]"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </div>
          <div class="col-6 signupLogin bg-[#f39032] rounded-r-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;