import React from 'react';




function RecommendBox2({ image, txt }) {
    
    return (
        <div className="">
           
            <div 
                className="relative w-[425px] h-[390px] mx-[50px] mt-[24px] my-24px rounded-[30px] border-solid overflow-hidden"> 
            
                <img src={image} alt="" className="w-full h-full object-cover hover:scale-95" />
                <div className="absolute inset-0 w-full h-full flex text-white text-3xl font-bold">
                    <p className='absolute bottom-8 flex w-full p-5 font-[Mitr]'>{txt}</p>
                </div>
            </div>
        </div >
    );
}

export default RecommendBox2;