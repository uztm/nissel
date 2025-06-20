import React from "react";

export default function Matcha() {
  return (
    <div className="mt-5">
      <h1 className=" text-2xl font-bold">Matcha</h1>

      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <div className="w-full aspect-video h-[150px] bg-[#F8F9F9] rounded-2xl px-10 relative overflow-hidden">
          <div className="h-full flex flex-col justify-center">
            <p className="text-5xl font-bold">Market</p>
            <p className="text-primary">Matcha mahsulotlari</p>
          </div>
          <img
            src="/assets/icon1.png"
            alt=""
            className="absolute bottom-[-20px] right-[-20px] w-32 h-32 object-contain"
          />
        </div>

        <div className="w-full aspect-video h-[150px] bg-[#F8F9F9] rounded-2xl px-10 relative overflow-hidden">
          <div className="h-full flex flex-col justify-center">
            <p className="text-5xl font-bold">Retsept</p>
            <p className="text-primary">Matcha retseptlari</p>
          </div>
          <img
            src="/assets/icon3.png"
            alt=""
            className="absolute bottom-[-20px] right-[-20px] w-32 h-32 object-contain"
          />
        </div>

        <div className="w-full aspect-video h-[150px] bg-[#F8F9F9] rounded-2xl px-10 relative overflow-hidden">
          <div className="h-full flex flex-col justify-center">
            <p className="text-5xl font-bold">Aloqa</p>
            <p className="text-primary">Biz bilan aloqa</p>
          </div>
          <img
            src="/assets/icon2.png"
            alt=""
            className="absolute bottom-[-20px] right-[-20px] w-32 h-32 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
