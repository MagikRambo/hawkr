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
      className="grid grid-cols-3 py-7 px-2 pr-4 border-bi cursor-pointer hover:opacity-80
      hover:shadow-lg transition duration-200 ease-out first:border-t bg-slate-100 sm:m-1 rounded-2xl"
      >
      <div className="relative h-24 w-40 md:h-24 md:w-40 flex-shrink-0">
        <Image
          src={ICProps.img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      
        
      <div className="col-span-1 flex flex-col pl-5 justify-items-center w-64">
        <div className="relative w-full h-8">
          <h4 className="text-xl text-black">{ICProps.title}</h4>
        </div>
        <div className="col-span-1 border-b w-10 pt-5" />
        <p className="pt-2 text-sm text-gray-500 w-full flex-grow">{ICProps.description}</p>
      </div>
      <div className="col-span-1 justify-self-end">
        
      {ICProps.open ? <StopIcon className="relative -top-4 -right-4 w-8 h-8  text-green-300"/> : <StopIcon className="relative -top-4 -right-4 w-8 h-8  text-red-300"/> }
      </div>
    </motion.div>
  );
};
export default InfoCard;
