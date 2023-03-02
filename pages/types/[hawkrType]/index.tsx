import React, { useState } from 'react'
import Map from '../../Map';
import { Transition } from '@headlessui/react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import get_shops_with_location from "../../api/getVendors";
import get_shops_by_id from "../../api/getShopById";
import InfoCard from '../../../components/InfoCard'
import Pagination from '../../../components/pagination';
import { useRouter } from 'next/router';

//Image imports
import hawkr_icon from '../../../public/img/hawkr_icon.png';
import LeftArrow from '../../../public/img/Left_Arrow.svg'
import RightArrow from '../../../public/img/Right_Arrow.svg'
import Image from 'next/image'
import Link from 'next/link';
import get_hawkr_types from '../../api/getHawkrTypes';
import get_shops_by_type from '../../api/getShopsByType';

type ExploreMenuProps = {
  shops:any
}

export const getStaticPaths = async () => {
  const {data} = await get_hawkr_types();
  const paths = data?.map(item => {
    return {
      params: {hawkrType: item.hawkrType.toString()}
    }
  })
  return {
      paths,
      fallback: false
  };
}

// export const getStaticProps = async ( ) => {

//     // const {params} = context
//     // console.log(context)
    
//     // console.log(type)
//     // const id = params.id
//     // console.log(id)
//     // const {data} = await get_shops_by_id(id)
//     // console.log(data)
//     // console.log(error)
//     // return {props: {shopData: data}}

// }
export const getStaticProps: GetStaticProps = async (context) => {
    // console.log("THIS IS THE STATIC PROPS")
    // console.log(context)
    // console.log("context params", context.params.hawkrType)
    // const data = null
    const { data } = await get_shops_by_type(context.params.hawkrType);
    // console.log(data)
    return { props: { shops: data } };
  };


function Types_Dyn_Menu(props: ExploreMenuProps) {
  const [curr_page, setCurrPage] = useState(1)

  // console.log(props)
  const router = useRouter()
  const routerType = router.query.type


  //Hawkr-blue is #1498
  return (
      <main className="flex">
        <section className="flex-grow h-screen pt-6 px-6 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <h1 className=' pb-2 pl-2 font-bold text-gray-600 text-2xl'> {routerType} Hawkrs near me</h1>

            <div className="flex flex-col">
              {props.shops?.map((item: any) => (
                <Link href={`/shops/${item.shopID}`}>
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
              <Link href='/hawkrVendorInfo' className="text-xl font-medium text-black">Want to run your business?</Link>
              <Link href='/hawkrVendorInfo'className="text-2xl font-bold text-sky-500">Setup a Hawkr</Link>
            </div>
          {/* <Pagination curr_page_idx={curr_page} total_items={props.shops.length}  */}
          {/* items_on_each_page={10} on_page_swith_to={(num)=>setCurrPage(num)}/> */}
        </section>
      </main>
  )
}

function Types_Dyn({ shops }: InferGetStaticPropsType<typeof getStaticProps>) {

  let [showOpen, setShowOpen] = useState(true)

  return (
    <>
    {/* <h1> THIS IS A LANDING PAGE</h1> */}
      <div className="flex justify-between bg-slate-200">
        <Transition className="w-2/5" show={showOpen}
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
          <Types_Dyn_Menu shops={shops} />
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

export default Types_Dyn;