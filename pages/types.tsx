import React, { Fragment, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import TypesCard from '../components/typesCard'
import {motion} from 'framer-motion'

//images
import hawkr_icon from '../public/img/hawkr_icon.png';
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'

import Link from 'next/link';
import reverseGeocode from './api/reverseGeocode';

type ExploreState = {
  showOpen: boolean;
};

type TypesMenuProps = {
  shops:any

}

type TypesMenuState = {
}
export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data }};
};

function TypesMenu (props: TypesMenuProps){
    
    let types:any = []
    let [FoodTruckSet, FoodTruckSetState] = useState(new Set())
    let [ClothesSet, ClothesSetState] = useState(new Set())
    let [ArtSet, ArtSetState] = useState(new Set())
    let HawkrTypeArr = [FoodTruckSet, ClothesSet, ArtSet]

    // var FTSet = []
    for (let typeElement of props.shops){
        if (typeElement.hawkrType === "FoodTruck"){
            FoodTruckSet.add(typeElement)
        }
        else if (typeElement.hawkrType === "Clothes"){
            ClothesSet.add(typeElement)
        }
        else if (typeElement.hawkrType ==="Art"){
            ArtSet.add(typeElement)
        }

        if (!types.includes(typeElement.hawkrType)){
            types.push(typeElement.hawkrType)
        }
    }
    console.log(types)
    return (
      <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
    >
      <main className="flex">
        <section className="flex-grow pt-6 px-6 bg-slate-200">
        <h1 className=' pb-2 pl-2 font-bold text-gray-600 text-2xl'>Hawkr Types</h1>

          <div className="flex flex-col">
                
            {types?.map((item: any) => (
              <>
              {/* {item === "FoodTruck" ? <div/> : <div/>} */}
              {/* {console.log("Inputting the type")} */}
              {/* {console.log(typeof(item.hawkrType))} */}
              <Link href={`types/${item}`}>
                <TypesCard
                  img={hawkr_icon}
                  title={item}
                  />
                </Link>
                </>
              ))}
            {/* <Link href='#' onClick={reverseGeocode}>
              APPLE BEES
            </Link> */}
          </div>
        </section>
      </main>
      </motion.div>
    )
}

function Types ({shops} : InferGetStaticPropsType<typeof getStaticProps>){

  let [showOpen, setShowOpen] = useState(true)

    // console.log(shops)
    return (
      <>
        <div className="flex justify-between bg-slate-200">
          <Transition className="w-2/5" show={showOpen} 
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
            <TypesMenu shops={shops}/>
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

export default Types;