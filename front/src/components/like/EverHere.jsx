import React, { useState } from "react";
import axios from "axios";

export default function EverHere({ visible, onClose }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [review, setReview] = useState(false);
  const [heart, setHeart] = useState([]);
  const token = localStorage.getItem("access_token");
  const getheart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/profile/heart/update",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res", response.heart);
      setHeart(response.heart);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };
  const handleOnCancel = () => {
    onClose();
    setMessage("");
  };
  const Noreview = () => {
    setReview(true);
    setTimeout(() => {
      setReview(false);
    }, 2000);
  };

  const handleOnClose = () => {
    if (!message.trim()) {
      Noreview();
    } else {
      setChatHistory([...chatHistory, message]);
      setMessage("");
      getheart();
      onClose();
    }
  };

  

  if (!visible) return null;
  return (
    <div className="absolute w-full h-full z-10 inset-0 bg-black/50 flex justify-center items-center">
      <div className="w-[715px] h-[414px] bg-white p-2 rounded-[30px] allign-center">
        <p className="p-3 text-center text-3xl font-bold text-black font-Anuphan py-8">
          คุณไปสถานที่นี้มาแล้วใช่ไหม?
        </p>
        <div className="flex flex-col text-[26px] top-0 left-0">
          <textarea
            type="text "
            className={`w-[609px] h-[223px] mx-10 text-top-left border-solid  bg-red-100 p-2 rounded-[30px] pt-5 pl-5 ${
              review ? "border-2 border-red-500" : "border-2"
            }`}
            placeholder="เขียนแชร์ประสบการณ์หน่อยสิ !"
            value={message}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex justify-end mx-12">
          <button
            onClick={handleOnCancel}
            className="mb-4 mt-3 mx-5 w-[114px] h-[42px] bg-neutral-400 rounded-[20px]"
          >
            <div className="text-center text-white text-xl font-bold font-Anuphan">
              ยกเลิก
            </div>
          </button>
          <button
            onClick={handleOnClose}
            className="mt-3 w-[199px] h-[42px] bg-cyan-500 rounded-[20px]"
          >
            <div className="text-center text-white text-xl font-bold font-Anuphan">
              รีวิวเพื่อรับ 🤍 เลย!
            </div>
          </button>
          <div />
        </div>
      </div>
    </div>
  );
}
