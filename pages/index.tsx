import React, { Fragment, useState } from 'react'
import Map from '../components/Map';
import TypesMenu from '../components/typesMenu';
import Navbar from '../components/navbar';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import {middleware} from '../middleware'

import { NextRequest } from 'next/server'

export default function Home() { 

  //TODO: Instead of populating our map. perform getStaticProps here and pull DB data and pass to Map as props.
  //Get shops around area [1]
    //Populate shops with appropriate markers [2]
      //[1]
    //console.log("index: ",shops)
    // middleware()
    return (
      <>
        {/* <Map shops={shops}/> */}
      </>
    );
}
