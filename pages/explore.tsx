import React, { Fragment, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import InfoCard from '../components/InfoCard'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

//Image imports
import hawkr_icon from '../public/img/hawkr_icon.png';
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'

type ExploreMenuProps = {
  shops: any
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data } };
};

// Props of Pgination:
type PaginationProps = {
  // 1  current page index
  curr_page_idx: number,
  // 2  total items of the list 
  total_items: number,
  // 3  how many items on each page 
  //    it's going to be {items_on_each_page * (page_idx - 1)} of {total_items} showing on the pagination
  items_on_each_page: number,
  // 4  callback function for swithc page, passing in when init, 
  //    it's going to be called every time hite the page
  on_page_swith_to: (page_idx: number) => void,
}

function Pagination(props: PaginationProps) {
  const [curr_page, setCurrPage] = useState(1);

  const getItemStyle = (active_page_idx: number) => {
    return active_page_idx == curr_page? "relative z-10 inline-flex items-center border border-cyan-500 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600 focus:z-20" :
    "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  }

  const getNavPages = (curr_page: number) => {
    const from_idx = curr_page < 4? 1: curr_page - 3;
    const to_idx = curr_page > Math.ceil(props.total_items/props.items_on_each_page) - 3?
                    Math.ceil(props.total_items/props.items_on_each_page) : curr_page + 3;
    const arr = new Array();
    for(let i = from_idx; i <= to_idx; ++i) {
      arr.push(i)
    }
    return arr
  }

  const pages = getNavPages(props.curr_page_idx);
  
  return (
    <div className="flex items-center justify-between border-t px-4 pt-1 pb-5 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/** The text of showing how many result in current page */}
        <div>
          <p className="text-sm text-gray-700">
            Showing 
            <span className="font-medium">
              {(props.curr_page_idx-1)*props.items_on_each_page+1}</span> to {' '}
            <span className="font-medium">
              {props.curr_page_idx*props.items_on_each_page > props.total_items 
              ? props.total_items: props.curr_page_idx*props.items_on_each_page}
            </span> of{' '}
            <span className="font-medium">{props.total_items}</span> results
          </p>
        </div>

        {/** Pagination nav */}
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/** Buttons in pagination */}
            {pages?.map((item: number)=>(
              <button className={getItemStyle(item)} onClick={() => props.on_page_swith_to(item)}>
                {item}
              </button>
            ))}

            <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

function ExploreMenu(props: ExploreMenuProps) {

  console.log(props.shops)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <main className="flex">
        <section className="flex-grow h-screen pt-14 px-6 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexible</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div> */}
          <div className="flex flex-col">
            {props.shops?.map((item: any) => (
              <InfoCard
                key={item.shopID}
                img={hawkr_icon}
                location={"item.location"}
                description={item.shopDescription}
                title={item.shopName}
              />
            ))}
          </div>
          <Pagination curr_page_idx={1} total_items={props.shops.length} items_on_each_page={10} on_page_swith_to={()=>{}}/>
        </section>
      </main>
    </motion.div>
  )
}

function Explore({ shops }: InferGetStaticPropsType<typeof getStaticProps>) {

  let [showOpen, setShowOpen] = useState(true)

  // console.log(shops)
  return (
    <>
      <div className="flex justify-between bg-slate-200">
        <Transition className="w-2/5" show={showOpen}
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
          <ExploreMenu shops={shops} />
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