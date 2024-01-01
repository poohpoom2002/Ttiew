import React, { createElement, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import PostBox from "../../components/webboard/PostBox";
import axios from "axios";
import loading from "../../asset/loading.svg";
const Webboard = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const token = localStorage.getItem("access_token");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const [userData, setUserData] = useState({});
  const [posts, getPosts] = useState([])

  const fetchUserData = async () => {
    await axios.get("http://localhost:3000/users/profile/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
     console.log(response.data)
      setUserData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const createPost = async () => {
    try {
      await axios.post(
        "http://localhost:3000/posts",
        {
          content: message.trim(), // Send the message as the content
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

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      
      getPosts(response.data)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleCreatePost = async() => {
    if (message.trim() === "") {
      alert("Please enter a non-empty message to create a post.");
    } else {
      setMessage("");
      await createPost();
      fetchPost();

    }
  };

  useEffect(() => {
    // Check if the data has already been fetched to avoid fetching it repeatedly.
    if (posts.length === 0) {
      fetchUserData();
      fetchPost();
    }
  }, []);
  return (
    <Sidebar
      yourCode={
        <div className="h-screen ">
          <div className=" bg-[#FE547B] h-[14.7%] text-5xl text-white flex items-center pl-48 ">
            เว็บบอร์ดที่เที่ยว
          </div>
          <div className="flex h-[85.3%] w-full ">
            <div className="relative overflow-y-scroll h-full w-[69%] border-r-2 snap-start ">
              <div className="flex flex-col-reverse">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostBox
                    post = {post}
                    key={index}

                  />
                ))
              ) : (
                <img src={loading} alt=""/>
      
              )}
              </div>
            </div>

            <div className="bg-[#00C2C1] h-full shadow-md flex-auto">
              <div className="font-bold font-Anuphan flex pt-4 pl-7 text-4xl gap-6">
                <img
                  className="w-28 h-28 rounded-full border-2 border-gray-500 "
                  src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
                  alt=""
                ></img>
                <div className="text-white font-Anuphan text-4xl pt-8">{userData.username}</div>
              </div>
              <div className="pt-7">
                <textarea
                  className="bg-white flex rounded-3xl h-[35rem] w-11/12 shadow-md  focus:outline-none pt-10 px-9 text-3xl ml-5 "
                  placeholder="เขียนโพสต์ของคุณที่นี่.."
                  value={message}
                  onChange={handleOnChange}
                  // onKeyUp={handleKeyDown}
                  id="Post"
                ></textarea>
              </div>

              <div className="flex justify-end pt-10 pe-3">
                <button
                  id="send-button"
                  className="bg-[#FE547B] text-3xl w-52 h-14 rounded-full text-white  font-Anuphan hover:scale-105 hover:bg-[#e0476d]"
                  onClick={handleCreatePost}
                  disabled={!message.trim()}
                >
                  Post Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Webboard;