import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";
// import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";


function PostBox({ post }) {
  return (
    <div className="border-b-2">
      <div className=" h-full mx-2 my-2 px-10 py-6 ">
        <div className=" flex gap-8 ">
          <Link to={`/profile?postId=${post.author._id}`}>
            <img
              class="w-28 h-28 rounded-full border-2 border-gray-500 cursor-pointer"
              src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
              alt=""

            ></img>
          </Link>
          
          <div className=" pt-6 font-bold text-4xl cursor-default">
            {post.author.username}
          </div>
        </div>
        <div className=" font-Anuphan pl-36 text-2xl h-full  w-full text-left">
          {post.content}
        </div>
        <div className="pt-10 pl-32 ">
          <div className="flex">
            <Link to={`/reply/${post._id}`}>
              <button className="flex w-full  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 text-[#02ACAB] hover:scale-110 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                <button className=" pt-2 font-Anuphan w-40  text-[#02ACAB] hover:scale-110 font-bold no-underline text-2xl">
                  การตอบกลับ
                </button>
              </button>
            </Link>

            <div className=" pt-2 h-full w-full pr-4 font-Anuphan flex justify-end text-2xl font-semibold text-[#AFAEAE] ">
              โพสต์เมื่อ {formatDate(post.createdAt)}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default PostBox;