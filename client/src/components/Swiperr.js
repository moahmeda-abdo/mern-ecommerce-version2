import React from "react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Swiperr() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={
              "https://res.cloudinary.com/drleayhps/image/upload/v1696551486/ddgj5rvf1xrghc9m3i1j.jpg"
            }
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              "https://res.cloudinary.com/drleayhps/image/upload/v1696551486/vyu3u0rcm45lktkdm5ha.jpg"
            }
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src={
              "https://res.cloudinary.com/drleayhps/image/upload/v1696551486/uxycz36qwfc2cmtsla3s.jpg"
            }
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            src={
              "https://res.cloudinary.com/drleayhps/image/upload/v1696548207/bpeomv48dygybnqjapi9.jpg"
            }
          ></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
