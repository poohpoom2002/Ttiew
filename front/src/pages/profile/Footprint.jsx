import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import "./Footprint.css"
import axios from "axios";
const Footprint = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile/footprint/item",
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

    fetchData();
  }, []);
  // const handleLocationClick = (index) => {
  //     // Create a copy of the footprint array
  //   const updatedFootprint = [...footprint];

  //   // Toggle the showOnProfile property at the given index
  //   updatedFootprint[index] = {
  //     ...updatedFootprint[index],
  //     showOnProfile: !updatedFootprint[index].showOnProfile,
  //   };

  //   // Update the state with the new footprint array
  //   setFootprint(updatedFootprint);  
  // };
  return (
    <Sidebar yourCode={
      <div className="h-full w-full">
        <div className="bg-[#1BC4C3] h-[14.7%] text-5xl text-white flex items-center ps-32">
          <Link to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              className="w-10 h-10 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>

          <div className="pl-6"> Footprint</div>
        </div>
        <div className="h-[85.3%] w-full border-r-2 ">
          {/* show image right here NO COMPONENT cuz im too lazy */}
          <div className="w-full h-full grid grid-cols-3 gap-2 flex justify-items-center px-[75px] pt-6 snap-start overflow-y-scroll">
            {
              data.map((loc, index) => (
                <div className={`relative w-[425px] h-[390px] rounded-[30px] bg-white overflow-hidden mb-6 select-none`} 
                  key={index} 
                  // onClick={() => handleLocationClick(index)}
                  >
                  <img src={loc.img} alt="" className="h-full w-full pointer-events-none"/>
                  <div className="absolute left-[19px] bottom-[30px] p-2 px-4 rounded-xl max-w-[385px] text-[30px] text-white font-bold border-text"
                  >
                    {loc.name}
                  </div>
                  
                </div>
              ))
            }
          </div>
        </div>
      </div>
    }/>
  )
};

export default Footprint;
