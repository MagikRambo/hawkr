import foodTruckIcon from './../../public/img/foodTruck.svg'
import artIcon from './../../public/img/art.svg'
import clothesIcon from './../../public/img/clothes.svg'

export function getHawkrTypeIcon(HawkrType:string) {

    let data = ""
    if (HawkrType === "FoodTruck"){
        data = foodTruckIcon.src as string
    }
    else if (HawkrType === "Clothes"){
        data = clothesIcon.src as string
    }
    else if (HawkrType === "Art"){
        data = artIcon.src as string
    }
    return data
}


