import React, { useState } from 'react'
import Map from '../../components/Map'
import get_shops_with_location from "../api/getShopsWithLocation";
import get_shops_by_id from "../api/getShopById";
import InfoCard from '../../components/InfoCard'
import { motion } from 'framer-motion'
import hawkr_icon from '../../public/img/hawkr_icon.png';


import Image from 'next/image';
import { Transition } from '@headlessui/react'
import Link from "next/link";
import LeftArrow from '../../public/img/Left_Arrow.svg'
import RightArrow from '../../public/img/Right_Arrow.svg'
import ShopCard from '../../components/ShopCard';
import { supabase } from '../../utils/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useParams } from 'react-router-dom'
import loading from '../../public/img/loading.svg'
import { useQuery } from 'react-query';


const getSpecificShop = async ({ id }: any) => {
  const { data, error } = await supabase.rpc('get_shops_by_id', { shop_id: id })
  return data
}
function SidePanelMenu(props: any) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <main className="">
        <section className="sm:flex-grow pt-14 sm:px-6 bg-slate-200">

          <div className="flex-col">
            {props.shops?.map((item: any) => (
              <ShopCard
                key={item.shopID}
                hawkrType={item.hawkrType}
                location={item.location}
                shopDescription={item.shopDescription}
                shopID={item.shopID}
                shopName={item.shopName}
                shop_image_url={item.shop_image_url}
              />
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  )
}

function useShopDetails() {

  // console.log("WE MADE IT TO DETAILS")

  let [showOpen, setShowOpen] = useState(true)
  let router = useRouter()
  let shopID = router.query

  //TODO: Need to stop refresh on window focus
  const { isLoading: shopDataIsLoading, data: shopData } = useQuery('specific-shop', () => getSpecificShop(shopID),
    {
      enabled: !!shopID.id
    })
  if (shopDataIsLoading) {
    return (
      <>
        <div className='w-full h-screen bg-slate-200 pl-5 text-black'>
          <h1> Loading... </h1>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between bg-slate-200">
        <Transition className="w-full sm:w-2/5" show={showOpen}
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-full sm:w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-full sm:w-2/5 ' leaveTo='opacity-0 w-0'>
          <button className='p-2 border-gray-300 bg-white text-gray-700 m-5 sm:hidden'
            onClick={() => setShowOpen(!showOpen)}>
            {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src} /> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src} />Show List</div>}
          </button>
          <SidePanelMenu shops={shopData} />
        </Transition>
        <div className='relative grow'>
          <button className={'absolute z-10 sm:rounded sm:border border-gray-300 bg-white sm:px-2.5 sm:py-1.5 sm:text-xs font-medium text-gray-700 sm:shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:m-8' + (showOpen ? "" : "absolute m-5")}
            onClick={() => setShowOpen(!showOpen)}>
            {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src} /> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src} />Show List</div>}
          </button>
          <Map shops={shopData} />
        </div>
      </div>
    </>
  )
}
export default useShopDetails
