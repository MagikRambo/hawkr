import React, { Fragment, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import InfoCard from '../components/InfoCard'
import {motion} from 'framer-motion'
import { getHawkrTypeIcon } from '../utils/functions/getHawkrTypeIcon';

//Image imports
import hawkr_icon from '../public/img/hawkr_icon.png';
import info from '../utils/info'
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'
import Link from 'next/link';



type ExploreProps = {
};

type ExploreState = {
  showOpen: boolean;
};

type ExploreMenuProps = {
  shops:any

}

type ExploreMenuState = {
}
export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data }};
};

function ExploreMenu (props: ExploreMenuProps){

    console.log(props.shops)
    return (
      <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
    >
      <main className="flex">
        <section className="flex-grow pt-14 px-6 bg-slate-200">
          
          {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexible</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div> */}
          <div className="flex flex-col">
            {props.shops?.map((item: any) => (
              <Link href={`shops/${item.shopID}`}>
              <InfoCard
                key={item.shopID}
                img={hawkr_icon}
                location={"item.location"}
                description={item.shopDescription}
                title={item.shopName}
                />
                </Link>
              ))}
          </div>
        </section>
      </main>
      </motion.div>
    )
}

function Explore ({shops} : InferGetStaticPropsType<typeof getStaticProps>){

  let [showOpen, setShowOpen] = useState(true)

    // console.log(shops)
    return (
      <>
        <div className="flex justify-between bg-slate-200">
          <Transition className="w-2/5" show={showOpen} 
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
            <ExploreMenu shops={shops}/>
          </Transition>
          <div className='relative grow'>
            <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
              onClick={()=>setShowOpen(!showOpen)}>
              {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src}/> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src}/>Show List</div>}
            </button>
            <Map shops={shops}/>
          </div>
        </div>
      </>
    )
}

export default Explore;