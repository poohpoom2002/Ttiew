import React, { useState, useMemo, useRef } from "react";
import "./Filter.css";

function Filter({ showPopup, togglePopup }) {
  const handleSubmitPopup = () => {
    togglePopup();
    // send data
  };

  const handleclosePopup = () => {
    togglePopup();
    setActiveButtons([]);
    setActiveButtonsKeyword([]);
  };

  const [activeButtons, setActiveButtons] = useState([]);
  const [activeButtonsKeyword, setActiveButtonsKeyword] = useState([]);


  const buttons = [
    "ศิลปะ",
    "วัฒนธรรม",
    "ศาสนา",
    "ธรรมชาติ",
    "อาหาร",
    "สุขภาพ",
    "บริการ",
    "บันเทิง"
  ];

  const buttonsKeyword = [
    'อาหาร',
    'คาเฟ่',
    'ห้างสรรพสินค้า',
    'วัด',
    'แอร์',
    'ดนตรี',
    'ตลาด',
    'บรรยากาศ',
    'พิพิธภัณฑ์',
    'สวน',
    'คาราโอเกะ',
    'กาแฟ',
    'เดินกิน',
    'เดินเที่ยว',
    'เดินเล่น',
    'ผ่อนคลาย',
    'วินเทจ',
    'ในร่ม',
    'กลางแจ้ง',
    'ออกกำลังกาย',
    'โรงภาพยนต์',
    'ธรรมชาติ',
    'ถ่ายรูป',
    'ช่วงเช้า',
    'ช่วงเย็น',
    'ดึก',
  ];

  const handleButtonClick = (index) => {
    if (activeButtons.includes(index)) {
      setActiveButtons(activeButtons.filter((item) => item !== index));
    } else {
      setActiveButtons([...activeButtons, index]);
    }
  };

  const handleButtonKeywordClick = (index) => {
    if (activeButtonsKeyword.includes(index)) {
      setActiveButtonsKeyword(
        activeButtonsKeyword.filter((item) => item !== index)
      );
    } else {
      setActiveButtonsKeyword([...activeButtonsKeyword, index]);
    }
  };

  return (
    <div>
      {showPopup && (
        <div
          id="popupFilter"
          className="flex fixed justify-center items-center top-0 left-0 bg-black/50 w-full h-full font-Mitr "
          style={{ zIndex: "99" }}
        >
          <div className="popup-inner rounded-[50px] border-2 border-black flex items-center w-[1158px] h-[823px] overflow-hidden">
            <div class="relative w-full h-full bg-white">
              <div class="flex justify-between items-center rounded-t-lg h-[131px] px-[57px] py-8 bg-[#00C2C1]">
                <div className="text-[40px] uppercase text-white">
                  Filter your destination
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="52" 
                  height="52" 
                  viewBox="0 0 256 256"
                  onClick={handleclosePopup}
                  className="text-white"
                >
                    <path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/>
                </svg>
              </div>
              <div className="w-full h-[692px]">
                <div className="w-[97%] h-full overflow-y-scroll p-[57px]">
                  <div className="text-[30px] font-bold text-[#FE547B] mb-4">
                    ความเกี่ยวข้อง
                  </div>
                  <div className="grid grid-cols-4 gap-x-[90px] gap-y-[20px] h-fit mb-[60px]">
                    {buttons.map((button, index) => (
                      <div
                        key={index} 
                        name={button}
                        onClick={() => handleButtonClick(index)}
                        className={`ButtonRow w-[173px] h-[40px] hover:bg-[#f39032] hover:text-white rounded-full bg-[#fff0b5] cursor-pointer flex items-center justify-center text-xl text-[#6f6f6f]   
                        ${activeButtons.includes(index) ? "active" : ""}`}
                      >
                        {button}
                      </div>
                    ))}
                  </div>
                  <hr/>
                  <div className="text-[30px] font-bold text-[#FE547B] my-4">
                    แท็ก
                  </div>
                  <div className="grid grid-cols-4 gap-x-[90px] gap-y-[20px] h-fit mb-[60px]">
                    {buttonsKeyword.map((button, index) => (
                        <div
                          key={index} 
                          name={button}
                          onClick={() => handleButtonKeywordClick(index)}
                          className={`ButtonRow w-[173px] h-[40px] hover:bg-[#f39032] hover:text-white rounded-full bg-[#fff0b5] cursor-pointer flex items-center justify-center text-xl text-[#6f6f6f]   ${
                            activeButtonsKeyword.includes(index) ? "active" : ""
                          }`}
                        >
                            {button}
                        </div>
                    ))}
                  </div>
                    <div
                      class="absolute bottom-2 left-[429px] w-[300px] ButtonApplyRow hover:bg-[#007c7c] rounded-full bg-[#00c2c1] text-[#ffffff] cursor-pointer text-center mb-6"
                      onClick={handleSubmitPopup}
                    >
                      <button class="filterButton text-xl py-4">Apply</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;


