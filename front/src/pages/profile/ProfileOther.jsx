import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useLocation } from "react-router-dom";
const ProfileOther = () => {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");
  const value = new URLSearchParams(location.search).get("value");
  const Pr = {
    name: "อลิชซาเบธ",
    username: "alice",
    list: "1",
    friend: "50",
    reviewsWriten: "6",
    describe: "อธิบายตัวคุณ เล่าสไตล์การท่องเที่ยวของคุณให้เค้าฟัง !",
  };
  const [footprint] = useState([
    {
      "id" : 1,
      "name": "Anusorn Cafe",
      "img": "https://www.ryoiireview.com/upload/article/202208/1660121041_30e62fddc14c05988b44e7c02788e187.jpg",
      "showOnProfile": true
    },
    {
      "id" : 2,
      "name" : "ลิตเติ้ลวอล์ค ลาดกระบัง",
      "img" : "http://mallbangkok.com/wp-content/uploads/2023/01/littlewalk-latkrabang.jpeg",
      "showOnProfile": true
    },
    {
      "id" : 3,
      "name" : "ละมุนบาร์",
      "img" : "https://www.ryoiireview.com/upload/article/201910/1571904065_62bf1edb36141f114521ec4bb4175579.jpg",
      "showOnProfile": false
    },
    {
      "id" : 4,
      "name" : "ตลาดนัดวิด-วะ การ์เด้น",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": true
    },
    {
      "id" : 5,
      "name" : "Baan Cool Cafe & Art Space",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 6,
      "name" : "SOUND ABOUT",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 7,
      "name" : "ริมสวน Rimsuan",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 8,
      "name" : "วัดลานบุญ",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 9,
      "name" : "เจ๊น้อย เจ้าเก่าดอนเมือง",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": true
    },
    {
      "id" : 10,
      "name" : "Cuppers Cafe",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 11,
      "name" : "Me Smile Cafe มี สไมล์ คาเฟ่ - บ้านกลางสวน ลาดกระบัง",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 12,
      "name" : "๙ล๙ Paiyanyai House",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": true
    },
    {
      "id" : 13,
      "name" : "SUM FRUIT บิงซู ลาดกระบัง",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": false
    },
    {
      "id" : 14,
      "name" : "ไก่เมา ลาดกระบัง",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": true
    },
    {
      "id" : 15,
      "name" : "วัดสังฆราชา (วัดสอง)",
      "img" : "https://www.ryoiireview.com/upload/article/202203/1647243838_dea0df353fcc369128b6bd7ae161bec5.jpg",
      "showOnProfile": true
    },
  ]);
  return (
    <Sidebar
      yourCode={
        <div className="w-full bg-yellow-100 h-full font-Anuphan">
          <div className="bg-white h-[35%] drop-shadow-xl relative">
            <div className="absolute top-16 left-16">
              <Link to={`/${value === '0' ? "webboard" : "reply"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  class="w-10 h-10 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
            </div>

            <div className="absolute top-16 left-40">
              <img
                class="w-64 h-64 rounded-full border-8 border-gray-500  "
                src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg"
                alt=""
              ></img>
            </div>
            <div className="absolute top-16 left-1/3 font-bold text-4xl ">
              {name}
            </div>
            <div className="absolute top-32 left-1/3 text-3xl text-[#4B4B4B] font-bold">
              {Pr.username}
            </div>
            <div className="absolute top-52 left-1/3 text-xl font-Anuphan ">
              <div className="flex gap-16">
                <div>{Pr.list} list</div>
                <div>|</div>
                <div>{Pr.reviewsWriten} reviews written</div>
              </div>
            </div>
            <div className="absolute top-72 left-1/3 text-xl font-Anuphan ">
              {Pr.describe}
            </div>
          </div>
          <div className="h-[65%] w-full border-r-2 ">
            <div className="w-full h-full grid grid-cols-3 gap-2 flex justify-items-center px-[75px] pt-14 snap-start overflow-y-scroll">
              {
                footprint.map((loc, index) => (
                  <div className={`relative w-[425px] h-[390px] rounded-[30px] bg-white overflow-hidden mb-6 select-none border-[9px] border-[#F39032]`} 
                    key={index} 
                    >
                    <img src={loc.img} alt="" className="h-full w-full pointer-events-none"/>
                    <div className="absolute left-[19px] bottom-[30px] text-[30px] text-white font-bold">{loc.name}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ProfileOther;
