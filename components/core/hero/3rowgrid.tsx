import React from "react";

export default function Rowgrid3() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

      <div
        className="w-full h-full aspect-square bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url('/assets/grid3.png')` }}
      />

      <div
        className="w-full h-full aspect-square bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url('/assets/grid1.png')` }}
      />

      <div
        className="w-full h-full aspect-square bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url('/assets/grid2.png')` }}
      />
    </div>
  );
}
