import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function Comment() {
  return (
    <div className="flex  ">
      <div className="w-60 "></div>
      <div className="h-32 w-screen items-center flex jusify-between border-b border-gray-300">
        <div className="flex items-center gap-10 ">
          <div className="w-24"></div>
          <div className="w-3"></div>
          
          <img
            className="w-20 h-20 rounded-full border border-gray-500 "
            src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
            alt=""
          ></img>
          <div className="flex gap-2">
            <div className="font-bold">name</div>
            <div >แสดงความคิดเห็นบนโพสต์ของคุณ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comment;