import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { Fragment, useState } from 'react'
import Map from './Map';
import ExploreMenu from '../components/exploreMenu';
import TypesMenu from '../components/typesMenu';
import Navbar from '../components/navbar';
import { createClient } from '@supabase/supabase-js';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data }};
};

export default function Home({shops}: InferGetStaticPropsType<typeof getStaticProps>) { 
  const [exploreOpen, setExploreOpen] = useState(false)
  const [typesOpen, setTypesOpen] = useState(false)
  const [currIdx, setCurIdx] = useState(0)

  const setOpen = (o: boolean, idx:number) => {
    if(idx == 1){
      setExploreOpen(o)
      setCurIdx(idx)
    } 
    else if (idx == 2){
      setTypesOpen(o)
      setCurIdx(idx)
    }
    else{
      setExploreOpen(false)
      setTypesOpen(false)
      setCurIdx(0)
      }
    }

  //TODO: Instead of populating our map. perform getStaticProps here and pull DB data and pass to Map as props.
  //Get shops around area [1]
    //Populate shops with appropriate markers [2]
      //[1]
    //console.log("index: ",shops)
    return (
      <>
        <Navbar handleOpen={setOpen} curr_idx = {currIdx}/>
        <ExploreMenu handleOpen={setOpen} open={exploreOpen} />
        <Map shops={shops}/>
      </>
    );
}
