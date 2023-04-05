import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

type TypesCardProps = {
  img: any;
  title: any;
};

function TypesCard(TCProps:TypesCardProps) {
  return (
    // <div className="sm:m-1">
    <motion.div
      initial={{
        x: -200,
        opacity: 0,
      }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex py-7 px-2 pr-4 border-bi cursor-pointer hover:opacity-80
    hover:shadow-lg transition duration-200 ease-out first:border-t bg-slate-100 sm:m-1 rounded-3xl"
    >
      <div className="relative h-24 w-40 md:h-24 md:w-40 flex-shrink-0">
        <Image
          alt="TCProps"
          src={TCProps.img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5 ">
        <h4 className="text-xl text-black">{TCProps.title}</h4>
      </div>
    </motion.div>
    // </div>
  );
};
export default TypesCard;
