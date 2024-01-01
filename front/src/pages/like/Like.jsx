import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import RecommendBox2 from "../../components/like/RecommendBox2";

import R from "../../asset/Siam-2.jpg";
import R2 from "../../asset/Templee-2.jpg";
import R3 from "../../asset/Junglee-2.jpg";
import R4 from "../../asset/Asiateaq-2.jpg";
import R5 from "../../asset/Yaowarat-2.jpg";
import R6 from "../../asset/Saochingcha-2.jpg";
import EverHere from "../../components/like/EverHere";
import axios from "axios";

const Like = () => {
  const [showEverHere, setShowEverHere] = useState(false);

  const handleOnClose = () => setShowEverHere(false);
  // const [locate,setLocate]=useState([]);
  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   const getLocate = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/users/profile/info",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("res", response.locate.username);
  //       setLocate(response.locate);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   getLocate();
  // }, []);
  const [ locate,setLocate] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile/like/item",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((response) => {
          console.log("res", response.data);
          setLocate(response.data);
         
        });
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar
        yourCode={
          <div className="h-full w-full">
            <div className="bg-[#FE547B] drop-shadow-2xl h-[14.7%] flex shadow-md">
              <div className=" text-[#FFF] text-5xl  mx-9 my-10 py-10 font-bold align-middle font-Anuphan">ที่เที่ยวที่ถูกจาย</div>
            </div>
            <div className="h-[85.3%] w-full bg-[#FDF2C6] overflow-y-scroll">
              <button
                onClick={() => setShowEverHere(true)}
                className="grid grid-cols-3 gap-y-[10px] items-center drop-shadow-2xl"
              >
                {locate.map((item) => (<RecommendBox2 image={item.img} txt={item.name} />))}
              </button>
            </div>
            <EverHere onClose={handleOnClose} visible={showEverHere} />
          </div>
        }
      />
    </div>
  );
};

export default Like;
