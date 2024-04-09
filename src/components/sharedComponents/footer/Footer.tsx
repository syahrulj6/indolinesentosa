import { IoLocationOutline } from 'react-icons/io5';
import { IoMdMail } from 'react-icons/io';

import { FaPhoneAlt } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-primary w-full py-4">
      <div className=" flex flex-col md:flex-row items-center justify-between mx-12 gap-4">
        <div className=" flex-1 flex flex-col gap-3  text-white text-center ">
          <div className="flex gap-2 justify-center md:justify-start  items-center">
            <FaPhoneAlt className="text-2xl" />
            <h3 className=" text-xl md:text-xl">+62 85104000241</h3>
          </div>

          <div className="flex gap-2 justify-center md:justify-start  items-center">
            <IoMdMail className="text-2xl " />
            <h3 className=" text-xl md:text-xl">indolinesentosa@gmail.com</h3>
          </div>
        </div>

        <div className="flex flex-1 text-white flex-col gap-2  ">
          <div>
            <IoLocationOutline className="h-5 w-5 md:w-7 md:h-7 mx-auto md:ml-0" />
          </div>
          <p className="text-center md:text-start">Surabaya: Griya Kebraon Tengah VIII Blok T-2 RT.003 RW.004 Kel.Kebraon, Kec. Karangpilang, Surabaya Jawa Timur</p>
        </div>

        <div className="flex flex-1 text-white flex-col gap-2 ">
          <div>
            <IoLocationOutline className="h-5 w-5 md:w-7 md:h-7 mx-auto md:ml-0" />
          </div>
          <p className="text-center md:text-start">Makassar: villa mutiara asri X NO 30 makassar</p>
        </div>
      </div>
    </footer>
  );
};
