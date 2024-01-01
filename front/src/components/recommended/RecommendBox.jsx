import React from 'react';

function RecommendBox({image, i, isShow}) {
  return (
    <div className="border-[8px] border-white rounded-[30px] overflow-hidden h-[327px] w-[460px] overflow-hidden"
      onClick={()=>isShow(i)}
      >
        <img src={image} alt="" className="w-full h-full object-cover cursor-pointer" />
    </div>
  );
}

export default RecommendBox;