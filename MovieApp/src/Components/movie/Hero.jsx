import React from "react";

import Button from "../ui/Button";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiSpeakerSlash } from "react-icons/pi";

export const Hero = () => {
  return (
    <div className=" bg-hero min-w-full h-56 md:h-146 bg-cover bg-center px-5 py-10 md:p-20 [box-shadow:inset_0_-150px_80px_0px_#181a1c]">
      <div className="text-left justify-end h-full flex flex-col">
        <div >
          <h1 className="text-2xl md:text-5xl font-bold">Duty After School</h1>
          <p className="line-clamp-2 md:line-clamp-4 md:max-w-1/2 text-sm md:text-lg my-3 md:mt-5 md:mb-10">
            Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan,
            Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk
            siswa sekolah menengah. Mereka pun segera menjadi pejuang garis
            depan dalam perang.
          </p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 md:gap-2.5">
            <Button>Mulai</Button>
            <Button variant="secondary">
              <IoMdInformationCircleOutline size={25} />
              Selengkapnya
            </Button>
            <img src="/18+.png" alt="18+" />
          </div>
          <div>
            <button className="border border-white rounded-[50%] p-2">
              <PiSpeakerSlash size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
