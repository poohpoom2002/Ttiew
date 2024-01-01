import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import loading from "../../asset/loading.svg";
const Profile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("postId");
  const mode = searchParams.get("mode");
  // console.log(mode)
  // console.log(postId)
  const [data, setData] = useState(false);
  const [myData,setMydata] = useState(false);

  const token = localStorage.getItem("access_token");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/profile/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res", response.data);
      setMydata(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!postId){
    fetchData();
  }
  else{
    fetchData();
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserData();
  }
    
  }, []);
  
  useEffect(()=>{
    if (myData._id == postId || !postId) {
      setData(myData);
    }
      
  },[myData]);

  const [isEditVisible, setIsEditVisible] = useState(mode == "edit");
  const handleEditClick = (state) => {
    if (state) {
      setIsEditVisible(!isEditVisible);
    }
  };

if (data){
  return (
    <Sidebar
      yourCode={
        <div className="w-full bg-yellow-100 h-full font-Anuphan">
          <div className="bg-white h-[35%] drop-shadow-xl relative">
            <div className="absolute top-16 left-40">
              <img
                className="w-64 h-64 rounded-full border-8 border-gray-500 "
                src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
                alt=""
              ></img>
            </div>
            <div className="absolute top-16 left-1/3 font-bold text-4xl ">
              {data.username}
            </div>
            <div className="absolute top-32 left-1/3 text-3xl text-[#4B4B4B] font-bold">
              {data.email}
            </div>
            {myData._id == postId || !postId ? (
                <div className="absolute top-16 left-[60rem] flex gap-8 pr-10 ">
                  <div onClick={handleEditClick}>
                    <button className="bg-[#00C2C1] hover:bg-[#3ea7a7] w-48 h-12 text-white font-bold py-2 px-4 rounded-full text-2xl">
                      <div>
                        แก้ไขโปรไฟล์ 
                      </div>
                    </button>
                  </div>
                  <Link to={`/footprint`}>
                    <button className="bg-[#00C2C1] hover:bg-gray-800 w-48 h-12 text-white font-bold py-2 px-4 rounded-full text-2xl">
                      Footprint
                    </button>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            
            <div className="absolute top-60 left-1/3 text-xl font-Anuphan ">
              {"อธิบายตัวคุณ เล่าสไตล์การท่องเที่ยวของคุณให้เค้าฟัง !"}
            </div>
          </div>
          <div className="h-[65%] w-full border-r-2 ">
            <div className="w-full h-full grid grid-cols-3 gap-2 flex justify-items-center px-[75px] pt-14 snap-start overflow-y-scroll">
              {/* {footprint.map((loc, index) => (
                <div
                  className={`relative w-[425px] h-[390px] rounded-[30px] bg-white overflow-hidden mb-6 select-none border-[9px] border-[#F39032]`}
                  key={index}
                >
                  <img
                    src={loc.img}
                    alt=""
                    className="h-full w-full pointer-events-none"
                  />
                  <div className="absolute left-[19px] bottom-[30px] text-[30px] text-white font-bold">
                    {loc.name}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      }
      isPopUpEdit={isEditVisible}
      toggleEdit={handleEditClick}
    />
  );
  }else{
    return (
      <Sidebar
      yourCode={
        <img src={loading} alt="" className="w-full h-full"/>
      }
    />
    );
    
  }
};

export default Profile;