import React from "react";
import Sidebar from "../../components/Sidebar";

const FootprintBox = ({loc,index,handleLocationClick}) => {
  return (
    <Sidebar yourCode={
        <div className={`relative w-[425px] h-[390px] rounded-[30px] bg-white overflow-hidden mb-6 select-none ${loc.showOnProfile ? 'border-[9px] border-[#F39032]': ''}`} 
            key={index} 
            onClick={() => handleLocationClick(index)}
            >
            <img src={loc.img} alt="" className="h-full w-full pointer-events-none"/>
            <div className="absolute left-[19px] bottom-[30px] text-[30px] text-white font-bold">{loc.name}</div>
        </div>
    }/>
  )
};

export default FootprintBox;
