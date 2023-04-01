import React, { useState } from 'react'
import Map from '../Map'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import get_shops_with_location from "../api/getVendors";
import get_shops_by_id from "../api/getShopById";
import InfoCard from '../../components/InfoCard'
import {motion} from 'framer-motion'
import hawkr_icon from '../../public/img/hawkr_icon.png';


import Image from 'next/image';
import { Transition } from '@headlessui/react'
import Link from "next/link";
import LeftArrow from '../../public/img/Left_Arrow.svg'
import RightArrow from '../../public/img/Right_Arrow.svg'
import ShopCard from '../../components/ShopCard';
import { supabase } from '../../utils/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';



export const getStaticPaths = async () => {
    const {data} = await get_shops_with_location();

    const paths = data?.map(item => {
        return {
            params: {id: item.shopID.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async ( {params}:any ) => {


    const id = params.id
    const {data} = await get_shops_by_id(id)
    return {props: {shopData: data}}
}


function ExploreMenu (props: any){

    return (
      <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
    >
      <main className="flex">
        <section className="flex-grow pt-14 px-6 bg-slate-200">

          <div className="flex flex-col">
            {props.shops?.map((item: any) => (
                <ShopCard
                key={item.shopID}
                hawkrType={item.hawkrType}
                location={item.location}
                shopDescription={item.shopDescription}
                shopID={item.shopID}
                shopName={item.shopName}

                />
                ))}
          </div>
        </section>
      </main>
      </motion.div>
    )
}

function shopDetails({shopData}:InferGetStaticPropsType<typeof getStaticProps>){

    // console.log("WE MADE IT TO DETAILS")

    console.log(shopData[0])
    // shopData = shopData[0]
    let [showOpen, setShowOpen] = useState(true)

    return (
        <>
          <div className="flex justify-between bg-slate-200">
            <Transition className="w-2/5" show={showOpen} 
            enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
            leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
                
             {/*  SECTION TO CREATE A NEW SHOP PAGE AND INSERT DATA HERE. */}
              <ExploreMenu shops={shopData}/>
            </Transition>
            <div className='relative grow'>
              <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
               hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
                onClick={()=>setShowOpen(!showOpen)}>
                {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src}/> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src}/>Show Shop</div>}
              </button>
              <Map shops={shopData}/>
            </div>
          </div>
        </>
      )
}
export default shopDetails
