import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { Fragment, useState } from 'react'

import Map from './Map';
import ExploreMenu from '../components/exploreMenu';
import Navbar from '../components/navbar';

type HomeProps = {
};

type HomeState = {
  exploreOpen: boolean,
  typesOpen: boolean,
  curr_idx:number
}

class Home extends React.Component<HomeProps, HomeState>{
  state = {exploreOpen: false, typesOpen:false, curr_idx:0};
  constructor(props: HomeProps){
    super(props)
  }

  setOpen = (o: boolean, idx:number) => {
    if(idx == 1) this.setState({exploreOpen: o, curr_idx:idx})
    else if (idx == 2) this.setState ({ typesOpen:o, curr_idx: idx})
    else this.setState({exploreOpen: false, typesOpen:false, curr_idx:0})
  }

  render() {
    return (
      <>
        <Navbar handleOpen={this.setOpen} curr_idx = {this.state.curr_idx}/>
        <ExploreMenu handleOpen={this.setOpen} open={this.state.exploreOpen} />
        <Map />
      </>
    );
  }
}


export default Home;