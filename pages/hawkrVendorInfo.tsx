import { EnvelopeIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import {supabase} from "../utils/supabaseClient"
import hawkr_pic from '../public/img/hawkr_pic.svg'
import Image from "next/image"
import { useRouter } from "next/router"
export default function Example() {
    const router = useRouter()
    return (
        <div className="flex-col bg-slate-200 text-black pl-4 space-betwee space-y-8">
            <Image height={250} width={250} alt='image' src={hawkr_pic}/>
            <h1 className="text-sky-400 text-4xl">How to set up a hawkr vendor page</h1>
            <div className="text-2xl space-y-4">
                <div className="text-gray-500">
                    <h1>Basic Requirements:</h1>
                        <li className="pl-10"> Account Created</li>
                        <li className="pl-10"> Application to become a Vendor</li>
                </div>
                
                <h1 className=" text-sky-400 text-4xl ">Create an Account</h1>
                <p> To set up a Hawkr vendor page, first create an account through the sign up button on the top right of the navigation bar. </p>
                
                <div className="pl-4 space-y-2">
                    <p className=""> or by clicking on the button below: </p>
                    <button onClick={() => router.push('/login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Sign up now!
                    </button>
                </div>

                <h1 className=" text-sky-400 text-4xl pt-4">Apply for Vendor status</h1>
                <p className=""> Once your account is created, apply to become a vendor at the top right of the nav bar.</p>
                <p> The application will be a form which is sent to our team.</p>
                <p className=""> We will assess your eligablity for Vendor status within a few weeks and follow up with your results!</p>

                <h1 className="text-purple-600 text-4xl"> We strive to bring YOU to people, become a hawkr vendor Today!</h1>
                <div className="pl-4 space-y-2">
                    <p className=""> Click the button to start today! </p>
                    <button onClick={() => router.push('/becomeVendor')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Become A Vendor!
                    </button>
                </div>            </div>
            
        </div>
    )
  }