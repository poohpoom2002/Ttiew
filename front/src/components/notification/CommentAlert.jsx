import React from "react";


function CommentAlert({ name }) {
  return (
    <div className="flex bg-yellow-100 ">
      <div className="h-48 w-screen items-center flex jusify-between border-b border-gray-300">
        <div className="flex items-center pl-20 ">
          <div>
            <div className="bg-[#FE547B] rounded-full inline-block h-6 w-6  text-center "></div>
          </div>
          <div className="pl-20">
            <div class="w-24 h-24 rounded-full border border-gray-500 overflow-hidden ">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              ></img>
            </div>
          </div>

          <div className="flex gap-6 text-3xl pl-16 ">
            <div className="font-bold">{name}</div>
            <div className="">แสดงความคิดเห็นบนโพสต์ของคุณ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommentAlert;
