import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { IoHeartCircleOutline } from "react-icons/io5";
import "./Card.css";
import { IoIosArrowBack } from "react-icons/io";
import { FiClock } from "react-icons/fi";

let db = [
  {
    name: "end",
    url: "https://www.prachachat.net/wp-content/uploads/2022/01/Central-@-Central-World.jpg",
    keyword: [],
    detail: "",
    review: [
      {
        username: "",
        description: "",
      },
    ],
  },
];

function Card(props) {
  const { propData } = props;
  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    db = [...db, ...propData];
    setCurrentIndex(db.length - 1);
    setIsFetchData(true);
  }, [propData]);

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [currentCardIndex, setCurrentCardIndex] = useState(currentIndex);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const [showReview, setShowReview] = useState(false);
  const toggleShowReview = () => {
    setShowReview(!showReview);
  };

  const [showClock, setShowClock] = useState(false);
  const toggleShowClock = () => {
    setShowClock(!showClock);
  };

  const [showAllButton, setshowAllButton] = useState(true);
  const VisibleButton = () => {
    setshowAllButton(!showAllButton);
  };

  const [count, setCount] = useState(0);

  const childRefs = useMemo(
    () => Array.from({ length: db.length }, () => React.createRef()),
    [db.length]
  );

  console.log(currentIndex, currentIndex === 0);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const [previousCardIndex, setPreviousCardIndex] = useState(currentIndex - 1);

  const getPreviousCardImage = () => {
    if (previousCardIndex >= 0) {
      const previousCard = db[previousCardIndex];
      return previousCard.img;
    }
    return null;
  };

  const previousCardImage =
    currentCardIndex < db.length ? db[currentCardIndex].img : null;

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex > 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current > idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const handleCancel = async () => {
    goBack();
    prevCount();
  };

  let nextCount = () => {
    if (count === 20) {
      setCount(20);
    } else {
      setCount(count + 1);
    }
    console.log(count);
  };

  let prevCount = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
    console.log(count);
  };

  const handleNext = () => {
    swipe("right");
    nextCount();
  };

  const handlePrev = () => {
    goBack();
    prevCount();
  };

  return isFetchData === true ? (
    <div>
      <div className="cardContainer font-Mitr">
        <div>
          {!showDetail && !showReview && !showClock
            ? db.map((character, index) =>
                character.name === "end" ? (
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={character.name}
                    onSwipe={(dir) => swiped(dir, character.name, index)}
                    onCardLeftScreen={() => outOfFrame(character.name, index)}
                  >
                    <div
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.7) 100%, rgba(0,0,0,0.1) 100%), url(${previousCardImage})`,
                      }}
                      className="card rounded-3xl justify-center mb-40"
                    >
                      <div className="flex flex-col justify-center items-center absolute h-[420px] w-[1000px] overflow-y-auto mt-48 text-amber-200 font-Anuphan font-bold">
                        <p className="mb-6 text-4xl">
                          คุณต้องการแมตช์ที่เที่ยวใหม่หรือไม่ ?
                        </p>
                        <div>
                          <button
                            className="m-16 bg-white text-black w-40 h-14 rounded-full text-3xl hover:scale-110"
                            onClick={handleCancel}
                          >
                            ยกเลิก
                          </button>
                          <button
                            className="m-16  bg-[#FE547B] text-black w-40 h-14 rounded-full text-3xl hover:scale-110"
                            onClick={toggleShowClock}
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    </div>
                  </TinderCard>
                ) : (
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={character.name}
                    onSwipe={(dir) => swiped(dir, character.name, index)}
                    onCardLeftScreen={() => outOfFrame(character.name, index)}
                  >
                    <div
                      style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0) 35%), url(${character.img})`,
                      }}
                      className="card rounded-3xl"
                    >
                      <div className="namecontainer">
                        <h3>{character.name}</h3>
                        <button onClick={toggleShowDetail}>ดูรายละเอียด</button>
                      </div>
                      <div className="keywords flex items-center">
                        {character.keyword
                          ? character.keyword.map((kw, kwIndex) => (
                              <p key={kwIndex} className="keyword text-center">
                                {kw}
                              </p>
                            ))
                          : null}
                      </div>
                    </div>
                  </TinderCard>
                )
              )
            : showDetail && !showReview && !showClock
            ? db.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.1) 95%), url(${character.img})`,
                    }}
                    className="card rounded-3xl"
                  >
                    <div className="flex h-20 ml-[90px] mt-20 items-center">
                      <button
                        className="text-2xl mr-10"
                        style={{
                          fontSize: "56pt",
                          color: "white",
                          textShadow: "40px",
                        }}
                        onClick={toggleShowDetail}
                      >
                        <IoIosArrowBack />
                      </button>
                      <h3 className="font-bold">{character.name}</h3>
                    </div>
                    <div className="flex absolute justify-center items-center ml-[90px] mt-52 gap-[20px]">
                      {character.keyword
                        ? character.keyword.map((kw, kwIndex) => (
                            <p
                              key={kwIndex}
                              className="keyword text-center text-3xl"
                            >
                              {kw}
                            </p>
                          ))
                        : null}
                    </div>
                    <div className="flex flex-wrap absolute h-[290px] w-[1300px] max-h-[290px] overflow-y-auto items-start ml-[90px] mt-72 text-white text-[20pt]">
                      {character.detail}
                    </div>
                  </div>
                </TinderCard>
              ))
            : !showDetail && !showReview && showClock
            ? db.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.1) 95%), url(${character.img})`,
                    }}
                    className="card rounded-3xl flex justify-center items-center"
                  >
                    <div className="flex flex-col h-20 items-center font-Anuphan -mt-96">
                      <div className="text-[250pt] text-white mb-6">
                        <FiClock />
                      </div>

                      <p className="font-bold text-[24pt] text-[#F1E189]">
                        รอ 20 นาที
                      </p>
                      <p className="font-bold text-[24pt] text-[#F1E189]">
                        เพื่อแมตช์ที่เที่ยวใหม่อีกครั้ง
                      </p>
                    </div>
                  </div>
                </TinderCard>
              ))
            : db.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.1) 95%), url(${character.img})`,
                    }}
                    className="card rounded-3xl"
                  >
                    <div className="flex h-20 ml-[90px] mt-20 items-center">
                      <button
                        className="text-2xl mr-10"
                        style={{
                          fontSize: "56pt",
                          color: "white",
                          textShadow: "40px",
                        }}
                        onClick={toggleShowReview}
                      >
                        <IoIosArrowBack />
                      </button>
                      <h3 className="font-bold">{character.name} : รีวิว</h3>
                    </div>
                    <div className="flex flex-col absolute h-[420px] w-[1320px] overflow-y-scroll items-start ml-[90px] mt-48 pe-[20px] text-white font-Anuphan">
                      {character.review.map((review, reviewIndex) => (
                        <div
                          key={reviewIndex}
                          className="flex flex-col mb-12 bg-white text-black w-full rounded-[50px] "
                        >
                          <p className="flex items-end h-20 ml-10 font-extrabold text-[22pt]">
                            {review.username}
                          </p>
                          <p className="h-24 items-center max-h-20 ml-10 mb-6 overflow-y-auto text-[18pt] text-gray-400">
                            {review.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TinderCard>
              ))}
        </div>

        <div className={`allbutton ${showAllButton ? "show" : "hidden"}`}>
          <div className={`${count === 20 ? "hidden" : "show"}`}>
            <div className="buttons flex w-[1500px] justify-center items-center">
              <button
                style={{
                  color: !canGoBack && "rgba(255, 255, 255, 0.8)",
                  fontSize: "58pt",
                  textShadow: "40px",
                }}
                onClick={() => handlePrev()}
              >
                <BsArrowLeftCircle />
              </button>
              <button
                style={{
                  fontSize: "62pt",
                  color: "yellow",
                  textShadow: "40px",
                }}
                onClick={toggleShowReview}
              >
                <MdOutlineReviews />
              </button>
              <button
                style={{
                  fontSize: "68pt",
                  color: "#D90D19",
                }}
                onClick={() => swipe("right")}
              >
                <IoHeartCircleOutline />
              </button>
              <button
                style={{
                  fontSize: "58pt",
                  textShadow: "40px",
                }}
                onClick={() => handleNext()}
              >
                <BsArrowRightCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Card;
