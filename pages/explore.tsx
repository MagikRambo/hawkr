import React, { useEffect, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import InfoCard from '../components/InfoCard'
import Pagination from '../components/pagination';

//Image imports
import hawkr_icon from '../public/img/hawkr_icon.png';
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'
import Link from 'next/link';
import {supabase} from '../utils/supabaseClient';
import { useSession, useUser } from '@supabase/auth-helpers-react';

type ExploreMenuProps = {
  shops:any
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data } };
};


function ExploreMenu(props: ExploreMenuProps) {

  const session = useSession()
  const userAlex = useUser()

  if(session){
    console.log("WE ARE ALIVE!! SESSION IS READY!!!", session)
  }else{
    console.log("NO SESSION NO SESSION : ", session)
  }

  if(userAlex){
    console.log("ALEX YOU ARE ALIVE: ", userAlex)
  }
  else{
    console.log(" ALEX IS NOT ALIVE, HE DEAD! ", userAlex)
  }
  const [curr_page, setCurrPage] = useState(1)

  console.log(props.shops)
  //Hawkr-blue is #1498
  return (
      <main className="flex">
        <section className="flex-grow h-screen pt-6 px-6 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <h1 className=' pb-2 pl-2 font-bold text-gray-600 text-2xl'> Hawkrs near me</h1>

            <div className="flex flex-col">
              {props.shops?.map((item: any) => (
                <Link href={`shops/${item.shopID}`}>
                <InfoCard
                  key={item.shopID}
                  img={hawkr_icon}
                  description={item.shopDescription}
                  title={item.shopName}
                  />
                  </Link>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* TODO: Set up the links to the set-up hawkr page*/}
              <Link href='#' className="text-xl font-medium text-black">Want to run your business?</Link>
              <Link href='#'className="text-2xl font-bold text-sky-500">Setup a Hawkr</Link>
            </div>
          <Pagination curr_page_idx={curr_page} total_items={props.shops.length} 
          items_on_each_page={10} on_page_swith_to={(num)=>setCurrPage(num)}/>
        </section>
      </main>
  )
}

function Explore({ shops }: InferGetStaticPropsType<typeof getStaticProps>) {

  let [showOpen, setShowOpen] = useState(true)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserID] = useState<string | undefined>();

  // useEffect( () => {
  //   const getUser = async () => {
  //     const user = await supabase.auth.getUser()
  //     console.log("user", user);
  //     if(user){
  //       const userId = user.data.user?.id;
  //       setIsAuthenticated(true);
  //       setUserID(userId);
  //     }
  //   };
  //   getUser();
  // }, [])

  if(isAuthenticated && userId){
    console.log("User", userId, "Authenticated", isAuthenticated)
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
          <ExploreMenu shops={shops} />
        </Transition>
        <div className='relative grow'>
          <button className={'absolute z-10 sm:rounded sm:border border-gray-300 bg-white sm:px-2.5 sm:py-1.5 sm:text-xs font-medium text-gray-700 sm:shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:m-8' + (showOpen?"":"absolute m-5")}
            onClick={() => setShowOpen(!showOpen)}>
            {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src} /> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src} />Show List</div>}
          </button>
          <Map shops={shops} />
        </div>
      </div>
    </>
  )
}

export default Explore;