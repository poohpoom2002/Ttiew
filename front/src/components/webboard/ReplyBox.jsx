import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { formatDate } from "../../utils";
import axios from "axios";

function ReplyBox({ currentPost, isCreateComment }) {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("access_token");
  const { postId } = useParams();
  const createComment = async () => {
    try {
      await axios.post(
        "http://localhost:3000/comments",
        {
          postId: postId,
          content: message, // Send the message as the content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleCreateComment();
    }
  };

  const handleCreateComment = async() => {
    if (message.trim() === "") {
      alert("Please enter a non-empty message to create a post.");
    } else {
      setMessage(" ");
      await createComment();
      isCreateComment();
    }
  };

  return (
    <div className="">
      <div className="border-b-2 ">
        <div className="h-full my-2 px-12 py-6 ">
          <div className="flex gap-8 ">
          <Link to={`/profile?postId=${currentPost.author._id}`}>
            <img
              className="w-28 h-28 rounded-full border-2 border-gray-500 cursor-pointer"
              src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
              alt=""
            />
          </Link>
            <div className="pt-6 font-bold text-4xl cursor-default">
              {currentPost.author.username}
            </div>
          </div>
          <div className="font-Anuphan pl-36 text-2xl h-full w-full text-left">
            {currentPost.content}
          </div>
          <div className="pt-10 pl-32 w-full">
            <div className="pt-2 pr-4 font-Anuphan flex justify-end text-2xl font-semibold text-[#AFAEAE]">
              {formatDate(currentPost.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="bg-[#F1E189] h-full w-full p-2 pl-16 font-Anuphan text-black text-2xl">
            การตอบกลับ
          </div>
        </div>
        <div className="m-7">
          <div className="w-full py-3 flex items-center px-6">
            <img
              className="w-28 h-28 rounded-full border-2 border-gray-500"
              src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https/tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
              alt=""
            />
            <div className="px-8 w-full pb-7">
              <textarea
                className="outline-none px-2 pt-5 w-full flex-wrap text-2xl"
                id="Comment"
                type="Comment"
                placeholder="Type your reply.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleKeyUp}
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyBox;
