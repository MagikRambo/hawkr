import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import get_shops_with_location from "../api/getVendors";
import get_shops_by_id from "../api/getShopById";


export const getStaticPaths = async () => {
    const {data} = await get_shops_with_location();

    const paths = data?.map(item => {
        return {
            params: {id: item.shopID.toString()}
        }
    })

    // console.log(paths)
    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async ( {params} ) => {


    const id = params.id
    // console.log(id)
    const {data} = await get_shops_by_id(id)
    // console.log(data)
    // console.log(error)
    return {props: {shopData: data}}

}

const Details = ({shopData}:InferGetStaticPropsType<typeof getStaticProps>) => {

    console.log("WE MADE IT TO DETAILS")

    console.log(shopData[0])
    shopData = shopData[0]
    return(
        <div>
            <h1> SAMPLE TEXT BELOW</h1>
            <h1> {shopData?.shopName}</h1>
            <p> {shopData?.Description}</p>
            <p> {shopData?.open}</p>
            <p> {shopData?.hawkrType}</p>
            <p> {"shopData.location"}</p>
        </div>
    );
}

export default Details