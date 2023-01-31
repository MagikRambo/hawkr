import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

type InfoCardProps = {
  img: any;
  location: any;
  description: any;
  title: any;
  star: number;
  price: any;
  total: any;
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
      className="flex py-7 px-2 pr-4 border-bi cursor-pointer hover:opacity-80
    hover:shadow-lg transition duration-200 ease-out first:border-t"
    >
      <div className="relative h-24 w-40 md:h-24 md:w-40 flex-shrink-0">
        <Image
          src={ICProps.img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{ICProps.location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{ICProps.title}</h4>
        <div className="border-b w-10 pt-5" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{ICProps.description}</p>
        <div className="flex justify-between">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {ICProps.star}
          </p>
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">
              $ {ICProps.price} / night
            </p>
            <p className="text-right font-extralight">$ {ICProps.total}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default InfoCard;
