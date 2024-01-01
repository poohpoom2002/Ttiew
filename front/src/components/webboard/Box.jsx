import React from "react";
import { Link,useParams } from "react-router-dom";
import { formatDate } from "../../utils";
// import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

function Box({ currentPost }) {
  return (  
    <div className="w-full h-full my-2 px-12 py-6 border-b-2">
      <div className=" flex gap-8 ">
        <Link to={`/profile?postId=${currentPost.author._id}`}>
          <img
            class="w-28 h-28 rounded-full border-2 border-gray-500 cursor-pointer"
            src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
            alt=""
          ></img>
        </Link>
        <div className="flex">
          <div className=" pt-6 font-bold text-4xl cursor-default">
            {currentPost.author.username}
          </div>

          <div className=" pt-9  text-xl text-[#A5A5A5] pl-10">
            ตอบกลับโพสต์ของ
          </div>
          <div className=" pt-8  text-2xl font-semibold text-[#A5A5A5] pl-4">
            {currentPost.content}
          </div>
        </div>
      </div>
      <div className=" font-Anuphan pl-36 text-2xl h-full  w-full text-left">
        {currentPost.content}
      </div>
      <div className=" pt-12 h-full w-full pr-4 font-Anuphan flex justify-end text-2xl font-semibold text-[#AFAEAE] ">
        {formatDate(currentPost.createdAt)}
      </div>
    </div>
  );
}
export default Box;