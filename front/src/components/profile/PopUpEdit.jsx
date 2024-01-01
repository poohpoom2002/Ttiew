import React, { useState } from 'react';
import {RiProfileFill} from "react-icons/ri";
import shan from '../../asset/shan.jpg';
function PopUpEdit({ isToggleEdit }) {
  const [noPassword, setNoPassword] = useState(false);
  const [imgEdit,setImgEdit] = useState(false);
  const [formData, setFormData] = useState({
    newImg: "",
    newName: "",
    newUsername: "",
    password: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === "") {
      setNoPassword(true);
      setTimeout(() => {
        setNoPassword(false);
      }, 1500);
    } else {
      console.log(formData);
      setFormData({
        newImg: "",
        newName: "",
        newUsername: "",
        password: "",
        newPassword: "",
      });
      setImgEdit(false);
    }
  };
  return (
    <div className="absolute inset-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center">
      <div className="relative w-[52%] h-[66%] bg-white rounded-3xl overflow-hidden">
        <div className="w-full h-[12.55%] flex justify-center items-center text-[26px] font-bold border-b border-[#969696] cursor-default">
          Edit Profile
        </div>
        <div className="w-full h-[87.45%] flex justify-center items-center">
          <div className="w-1/2 h-full flex flex-col items-center">
            <div className="w-[297px] h-[297px] rounded-full border-[15px] border-[#FF7595] overflow-hidden mt-[45px] mb-[35px]">
              <img src={shan} alt="" />
            </div>
            <button className="text-xl text-[#FE547B] font-semibold underline underline-offset-4 mb-[35px]" onClick={() => setImgEdit(!imgEdit)}>
              Change profile photo
            </button>
            { imgEdit && (
              <form className='rounded-2xl w-2/3 h-[54px] flex text-[#999999] text-xl overflow-hidden border border-[#F39032]'>
                <input
                className="rounded-2xl w-full h-full text-center flex-auto border-none focus:outline-none"
                type="text"
                id="newImg"
                name="newImg"
                value={formData.newImg}
                onChange={handleChange}
                spellCheck="false"
                placeholder="Your image url here"
                />
                <div className='h-full w-14 flex justify-center items-center text-white text-2xl bg-[#00c2c1] z-10 rounded-e-2xl'>
                  <RiProfileFill/>
                </div>
              </form>
            )}
          </div>

          <div className="w-1/2 h-full flex justify-start items-center pb-4 ">
            <form
              className="w-[445px] h-[511px] flex flex-col text-xl text-[#999999] cursor-default"
              onSubmit={handleSubmit}
            >
              <div className="mb-[22px]">
                <p className="block" htmlFor="newName">
                  New name{" "}
                </p>
                <input
                  className="bg-[#FDF2C6] rounded-2xl w-full h-[54px] py-2 px-3 text-center text-2xl"
                  type="text"
                  id="newName"
                  name="newName"
                  value={formData.newName}
                  onChange={handleChange}
                  spellCheck="false"
                  maxLength={20}
                />
              </div>
              <div className="mb-[22px]">
                <p className="block" htmlFor="newUsername">
                  New Username{" "}
                </p>
                <input
                  className="bg-[#FDF2C6] rounded-2xl w-full h-[54px] py-2 px-3 text-center text-2xl"
                  type="text"
                  id="newUsername"
                  name="newUsername"
                  value={formData.newUsername}
                  onChange={handleChange}
                  spellCheck="false"
                  maxLength={20}
                />
              </div>
              <div className="mb-[22px]">
                <p className="block" htmlFor="password">
                  <span className="text-[#FF7595]">*</span> Password
                </p>
                <input
                  className={`bg-[#FDF2C6] rounded-2xl w-full h-[54px] py-2 px-3 text-center text-2xl ${
                    noPassword ? "border-2 border-red-500" : ""
                  }`}
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  spellCheck="false"
                  maxLength={20}
                  // placeholder={`${noPassword ? "Password Required" : "" }`}
                />
              </div>
              <div className="mb-[22px]">
                <p className="block" htmlFor="newPassword">
                  New Password{" "}
                </p>
                <input
                  className="bg-[#FDF2C6] rounded-2xl w-full h-[54px] py-2 px-3 text-center text-2xl"
                  type="text"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  spellCheck="false"
                  maxLength={20}
                />
              </div>
              <div className="flex-auto"></div>
              <button
                className="bg-[#F39032] rounded-2xl w-full h-[54px] py-2 px-3 text-center font-bold text-white"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="absolute top-5 right-5 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 256 256"
            onClick={() => {
              isToggleEdit(true);
            }}
          >
            <path
              fill="currentColor"
              d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default PopUpEdit;
