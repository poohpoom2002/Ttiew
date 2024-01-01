import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import RecommendBox from "../../components/recommended/RecommendBox";
import cafe from "../../asset/images/cafe.jpeg";
import bar from "../../asset/images/bar.jpg";
import food from "../../asset/images/food.jpeg";
import visit from "../../asset/images/ที่เที่ยวลาดกระบัง.jpeg";
import market from "../../asset/images/ตลาด.jpeg";
import buffet from "../../asset/images/buffet.jpeg";
import japanese from "../../asset/images/japanese.jpeg";
import yum from "../../asset/images/Yum.jpeg";
import airportRestaurant from "../../asset/images/airportRestaurant.jpeg";
import recommendedCafe from "../../asset/data/recommendedCafe";
import recommendedBar from "../../asset/data/recommendedBar";
import recommendedRestaurant from "../../asset/data/recommendedRestaurant";
import recommendedLocation from "../../asset/data/recommendedLocation";
import recommendedMarket from "../../asset/data/recommendedMarket";
import recommenedBuffet from "../../asset/data/recommendedBuffet";
import recommendedJapanese from "../../asset/data/recommendedJapanese";
import recommendedYum from "../../asset/data/recommendedYum";
import recommendedAirportRestaurant from "../../asset/data/recommendedAirportRestaurant";

const Recommended = () => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const handleClick = (index) => {
    setDescriptionVisible(true);
    setShowDetail(allRecommended[index]);
  };

  const closeDetail = () => {
    setDescriptionVisible(false);
  };
  const allRecommended = [
    {
      title: "Cafe ลาดกระบัง",
      smallTitle: "บรรยากาศดีน่านั่ง",
      titleImage: cafe,
      detail: recommendedCafe
    },
    {
      title: "10 ร้านเหล้า",
      smallTitle: "ฟังดนตรีสดให้ผ่อนคลาย",
      titleImage: bar,
      detail: recommendedBar
    },
    {
      title: "ร้านอาหารลาดกระบัง",
      smallTitle: "น่าเช็คอินในวันพักผ่อน",
      titleImage: food,
      detail: recommendedRestaurant
    },
    {
      title: "ที่เที่ยวลาดกระบัง",
      smallTitle: "สถานที่ดังต้องไปสักครั้ง",
      titleImage: visit,
      detail: recommendedLocation
    },
    {
      title: "เช็คอิน ตลาดเก่าหัวตะเข้&ตลาดหลวงแพ่ง",
      smallTitle: "สำรวจไลฟ์สไตล์ย่านบางนา-ลาดกระบัง",
      titleImage: market,
      detail: recommendedMarket
    },
    {
      title: "บุฟเฟ่ต์ลาดกระบัง",
      smallTitle: "",
      titleImage: buffet,
      detail: recommenedBuffet
    },
    {
      title: "รวมร้านอาหารญี่ปุ่น ลาดกระบัง",
      smallTitle: "เสิร์ฟจุกๆ ราคาโดนใจ",
      titleImage: japanese,
      detail: recommendedJapanese
    },
    {
      title: "5 ร้านยำแซ่บ ลาดกระบัง",
      smallTitle: "แซ่บสะท้านรสจัดโดนใจ",
      titleImage: yum,
      detail: recommendedYum
    },
    {
      title: "5 ร้าน ใกล้สุวรรณภูมิ",
      smallTitle: "อิ่มอร่อยก่อนบิน",
      titleImage: airportRestaurant,
      detail: recommendedAirportRestaurant
    },
  ];

  return (
    <Sidebar
      yourCode={
        <div className="h-full w-full bg-[#F1E189] flex items-center justify-center">
          {descriptionVisible && (
                <div className="w-[1065px] h-full bg-white flex flex-col justify-center items-center">
                  <div className="bg-[#00C2C1] w-full h-[14.7%] text-white flex items-center relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-10 h-10 cursor-pointer absolute left-[82px]"
                      onClick={closeDetail}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                    <div className="flex-col flex-1 text-center">
                      <div className="text-[45px] font-bold">{showDetail.title}</div>
                      <div className="text-[32px] font-small">{showDetail.smallTitle}</div>
                    </div>
                  </div>
                  <div className="flex flex-col h-[85.3%] w-full overflow-y-scroll text-4xl text-center justify-items-center">
                    {
                      showDetail.detail.map((location, index) => (
                        <div key={index} className="flex flex-col pt-5">
                            <h className="font-bold">{location.name}</h>
                            <h className="my-10 mx-10 text-xl text-left">{location.descriptions}</h>
                            <div className="w-[489px] h-[326px] overflow-hidden mx-auto">
                              <img src={location.pic} alt="" className="w-full h-full"/>
                            </div>
                            <div className="flex w-[1055px] flex-col space-y-1 list-disc list-inside pt-4 px-[54px]">
                              <li className="w-fit my-1 text-xl">
                                <text className="font-bold">Location </text>
                                <text className="">{location.location}</text>
                              </li>
                              <li className="w-fit my-1 text-xl break-all text-start">
                                <text className="font-bold">GoogleMap </text>
                                <text className="text-amber-500">{location.googleMap}</text>
                              </li>
                              <li className="w-fit my-1 text-xl">
                                <text className="font-bold">Phone </text>
                                <text className="">{location.phone}</text>
                              </li>
                              <li className="w-fit my-1 text-xl pb-5">
                                <text className="font-bold">Facebook </text>
                                <text className="text-amber-500">{location.facebook}</text>
                              </li>
                            </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
            )}
          <div
            className={`h-full grid gap-x-[57px] gap-y-[19px] py-[37px] ${
            descriptionVisible ? "w-[519px] grid-cols-1 px-[29.5px] overflow-y-scroll" : "w-full grid-cols-3 px-[59px]"
            } `}
          >
            {allRecommended.map((data, index) => (
            <RecommendBox key={index} image={data.titleImage} i={index} isShow={handleClick} />
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Recommended;
