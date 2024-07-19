import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSportclubs,
  selectAllSportclubs,
} from "../../redux/feature/sportclub/SportClubSlice";
import CardNewSpord from "./CardNewSpord";
import Map from "../sport-club/Map";
import {
  decrement,
  increment,
  incrementByAmount,
  hoverMaps,
  counts,
  hoverMapsss,
} from "../../redux/feature/HoverOnMapSlcie";

export default function SportNewClub() {
  const dispachhover = useDispatch();
  const sportClub = useSelector(selectAllSportclubs);
  const dispach = useDispatch();
  useEffect(() => {
    dispach(fetchSportclubs());
  }, []);

  const [count10, setCount] = useState(10);
  const [images, setimages] = useState(null);

  const [image2, setimage2] = useState(
    "http://136.228.158.126:50003/media/uploads/category_9e9d5d4e-5b90-4aa8-bf04-d9e39117e6cc.jpg"
  );

  const seletAcion = useSelector(counts);
  console.log("show const ", seletAcion);

  const img = useSelector(hoverMapsss);
  console.log("tes hover ", img);

  // const imagehover = useSelector((state) => state.countAndHovers.hover);
  // console.log("test image hover", imagehover);

  // const handlnothoverimage = () => {
  //   dispachhover(resetHover());
  // };
  const handlhoverimage=()=>{
    setimages(
      "http://136.228.158.126:50003/media/uploads/category_9e9d5d4e-5b90-4aa8-bf04-d9e39117e6cc.jpg"
    );
  }
  const handlnothover=()=>{
    setimages("")
  }
  const hndlNOtimage2=()=>{
    setimage2("")
  }

  return (
    <div>
      <div className=" mt-[100px] mx-10">
        <button
          onClick={() => dispachhover(increment())}
          className="bg-slate-500 text-2xl"
        >
          +
        </button>
        <button
          onClick={() => dispachhover(decrement())}
          className="bg-slate-500 text-2xl"
        >
          -
        </button>
        <button
          onClick={() => dispachhover(incrementByAmount(count10))}
          className="bg-slate-500 text-2xl"
        >
          +10
        </button>
        {/* <button
          onMouseOut={() => dispachhover(hoverMaps(hndlNOtimage2))}
          onMouseOver={() => dispachhover(hoverMaps(image2))}
          className="bg-slate-500 text-2xl"
        >
          image
        </button> */}

        <button
          onMouseOut={handlnothover}
          onMouseOver={handlhoverimage}
          className="bg-slate-500 text-2xl"
        >
          image2
        </button>
      </div>
      <p>{seletAcion} image</p>

      <div className=" flex">
        <div className=" w-[100px] h-[80px]">
          <img src={img} alt="" />
        </div>
        <div className=" w-[100px] h-[80px]">
          <img src={images} alt="ddd" />
        </div>
      </div>

      <div className="flex justify-center  w-[100%] mt-[0px]">
        <div
          onMouseOut={() => dispachhover(hoverMaps(hndlNOtimage2))}
          onMouseOver={() => dispachhover(hoverMaps(image2))}
          className="  w-[500px] ml-[100px]"
        >
          <h1>sportn all</h1>
          {sportClub.map((sprt, index) => (
            <CardNewSpord
              key={index}
              name={sprt.sport_name}
              image={sprt.image}
            />
          ))}
        </div>
        <div className="ml-auto w-[400px] h-[200px]">
          <Map />
        </div>
      </div>
    </div>
  );
}
