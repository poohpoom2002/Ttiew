import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import profileDefault from "../../asset/profile_default.png";
import logo from "../../asset/logo.png";

const Home = () => {
  return (
    <div className="font-Mitr bg-[#28132a] h-screen">
      <nav className="flex p-12 bg-[#FE547B] items-center">
        <div className="absolute left-[50px]">
          <div className="w-50 h-50">
            <img src={logo} className="" alt="" />
          </div>
        </div>
        <button className="absolute text-white left-[250px]">
          <Link to="/">เรียนรู้เพิ่มเติม</Link>
        </button>
        <button className="absolute text-white left-[400px]">
          <Link to="/">ติดต่อเรา</Link>
        </button>

        <Link
          className="absolute right-[150px] text-black bg-[#f1e189] px-10 py-2 rounded-full hover:bg-[#daa700] hover:text-white"
          to="/login"
        >
          <button>เข้าสู่ระบบ </button>
        </Link>
        <div className="absolute right-[50px]">
          <div className="w-16 h-16">
            <img src={profileDefault} className="" alt="" />
          </div>
        </div>
      </nav>
      <div
        id="sky"
        className="relative flex items-center justify-center flex-col"
      >
        <div class="text-5xl pb-20 text-white">
          DIDN’T HAVE AN ACCOUNT YET ?<div class="w-full py-6"></div>
          <Link
            class="linking text-white p-2 block w-1/2 rounded-full bg-[#02c4c3] m-auto createHome hover:bg-[#008181] hover:text-white text-2xl text-center"
            to="/signup"
          >
            <button>สร้างบัญชี</button>{" "}
          </Link>
        </div>
        <div class="mountain_btm_left absolute w-1/2"></div>
        <div class="mountain_btm_mid absolute w-full"></div>
        <div class="mountain_btm_right absolute w-1/2"></div>
      </div>{" "}
      <section className="relative">
        <div class="container w-full text-white px-20">
          <div class="pt-3"></div>
          <div class="text-4xl py-5 px-20">เว็บไซต์สำหรับคนไม่รู้จะไปไหนดี</div>
          <div class="text-2xl py-3 px-20">--- หากคุณไม่รู้ว่าวันนี้จะไปไหน เข้ามาลองเล่นกับเราได้ที่นี้! </div>
        </div>
      </section>
    </div>
  );
};

export default Home;