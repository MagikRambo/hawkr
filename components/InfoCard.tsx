import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon, StopIcon  } from "@heroicons/react/24/solid";

type InfoCardProps = {
  img: any,
  description: any,
  title: any,
  open?: boolean,
};

function InfoCard(ICProps:InfoCardProps) {

  return (
    <motion.div
      initial={{
        x: -200,
        opacity: 0,
      }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="grid grid-cols-4 py-7 px-2 pr-4 border-bi cursor-pointer hover:opacity-80
      hover:shadow-lg transition duration-200 ease-out first:border-t bg-slate-100 sm:m-1 rounded-2xl"
      >
      <div className="relative md:h-24 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-40 flex-shrink-0">
        <Image
          src={ICProps.img}
          fill={true}
          alt={ICProps.img}
          className="overflow-hidden rounded-2xl object-cover"
        />
      </div>
      
        
      <div className="col-span-2 flex flex-col pl-5 justify-items-center  lg:w-full grow">
        <div className="relative w-full h-8">
          <h4 className="grow md:text-l lg:text-xl text-black">{ICProps.title}</h4>
        </div>
        <div className=" col-span-1 border-b w-10 pt-5" />
        <div>
          <p className="truncate sm:max-w-md md:max-w-lg lg:max-w-full pt-2 text-sm text-gray-500 w-full flex-grow">{ICProps.description}</p>
        </div>
      </div>
      <div className="col-span-1 justify-self-end">
        
      {ICProps.open ? <StopIcon className="relative -top-4 -right-4 w-8 h-8  text-green-300"/> : <StopIcon className="relative -top-4 -right-4 w-8 h-8  text-red-300"/> }
      </div>
    </motion.div>
  );
};
export default InfoCard;
