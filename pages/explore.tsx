import React, { useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import InfoCard from '../components/InfoCard'
import Pagination from '../components/pagination';

//Image imports
import hawkr_icon from '../public/img/hawkr_icon.png';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'
import Link from 'next/link';

type ExploreMenuProps = {
  shops:any
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data } };
};

type ShopeCardProps = {
  shop: {
    hawkrType: string,
    location: {lat: number, lng: number},
    shopDescription: string,
    shopID: string,
    shopName: string,
  }
}

function ShopCard(props: ShopeCardProps){

  return (
    <main className="flex">
      <section className='flex-grow h-screen pt-10 px-16 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
        <div className='h-60'/>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-6xl font-bold pt-8'>{props.shop.shopName}</h1>
            <p className='text-xl pb-4'>{props.shop.hawkrType}</p>
          </div>
          <HeartIcon className='h-14 cursor-pointer mr-7 '/>
        </div>
        <p className='font-bold text-xl py-2'>Current Location: {props.shop.location.lat} {props.shop.location.lng}</p>
        <p className='font-bold text-4xl py-4'>Vender Detail</p>
        <p className='py-2 text-2xl'>{props.shop.shopDescription}</p>

        {/** The text Review Part*/}
        <p className='font-bold text-4xl py-4'>Leave a Review</p>
        <div className='flex justify-start'>
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
        </div>
        <div className='py-2 mt-1 h-52'>
          <textarea className='block h-full w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'/>
        </div>
        <div className="mt-2 flex justify-end">
        <button type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Post
        </button>
      </div>
      </section>
    </main>
  )
}


function ExploreMenu(props: ExploreMenuProps) {
  const [curr_page, setCurrPage] = useState(1)

  console.log(props.shops)
  return (
      <main className="flex">
        <section className="flex-grow h-screen pt-8 px-6 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
          <Pagination curr_page_idx={curr_page} total_items={props.shops.length} 
          items_on_each_page={10} on_page_swith_to={(num)=>setCurrPage(num)}/>
        </section>
      </main>
  )
}

function Explore({ shops }: InferGetStaticPropsType<typeof getStaticProps>) {

  let [showOpen, setShowOpen] = useState(true)

  return (
    <>
      <div className="flex justify-between bg-slate-200">
        <Transition className="w-2/5" show={showOpen}
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
          {/**
          <ExploreMenu shops={shops} />
           */}
          {/** 
          */}
          <ShopCard shop={shops[0]}/>
        </Transition>
        <div className='relative grow'>
          <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
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