import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ReplyBox from "../../components/webboard/ReplyBox";
import { Link, useParams } from "react-router-dom";
import Box from "../../components/webboard/Box";
import axios from "axios";
import { formatDate } from "../../utils";
import loading from "../../asset/loading.svg";

const Reply = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState([]);
  const [post, setPost] = useState({});
  const token = localStorage.getItem("access_token");

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/comments/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setComment(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchComment(), fetchPost()]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (!post._id) {
      fetchData();
    }
  }, [post._id]);

  const reComment = () => {
    fetchComment();
  };
  // Only render the component when both comment and post data is available
  if (Object.keys(post).length > 0) {
    return (
      <Sidebar
        yourCode={
          <div className="h-screen">
            <div className="bg-[#FE547B] h-[14.7%] text-5xl text-white flex items-center ps-32">
              <Link to="/webboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>

              <div className="pl-6"> เว็บบอร์ดที่เที่ยว</div>
            </div>
            <div className="h-[85.3%] w-full border-r-2 snap-start overflow-y-scroll">
              <ReplyBox currentPost={post} isCreateComment={reComment} />
              <div className="w-full flex flex-col-reverse">
                {comment.map((item, index) => (
                  <Box
                    currentPost={item}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        }
      />
    );
  } else {
    // You can render a loading indicator or a message while data is being fetched.
    return(
      <Sidebar
        yourCode={
          <div className="h-screen">
            <div className="bg-[#FE547B] h-[14.7%] text-5xl text-white flex items-center ps-32">
              <Link to="/webboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>

              <div className="pl-6"> เว็บบอร์ดที่เที่ยว</div>
            </div>
            <div className="h-[85.3%] w-full border-r-2 snap-start overflow-y-scroll">
              <img src={loading} alt="" className="w-full h-full"/>
            </div>
          </div>
        }
      />
    );
  }
};

export default Reply;

