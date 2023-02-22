import type { NextPage } from 'next'
import { Auth, ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import styles from '../styles/supabasestyling.module.css'
import Image from 'next/image'
import hawkr from '../public/img/hawkr.png'
import hawkr_pic from '../public/img/hawkr_pic.svg'
import { useEffect, useState } from 'react'
import { stat } from 'fs'
import supabase from '../utils/supabaseClient'

const signup: NextPage = () => {
    const session = useSession()
    // const supabase = useSupabaseClient()
    
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    async function signUpWithEmail(){
        try{
            if (email && password){
                const resp = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    
                });

                if (resp.error) throw resp.error;

                const userId = resp.data.user?.id;
                console.log("userId: ", userId)
            }
            
        }catch{
            /* INSERT CATCH HERE IF HERE */
        }
    }
    return (
      <>
        <div className='bg-white' style={{ padding: '50px 0 100px 0' }}>
          {!session ? //if (!user)
          (
            <div className='grid grid-cols-2 '>
              {/*  GRID LAYOUT */}

              {/* Column 1 - Image*/}
                <div className='border-r border-r-slate-700 m-5'>
                    {/* <h2 className='text-black'> THIS IS LEFT</h2> */}
                    <Image width={8000} height={10000} alt="hawkr logo" src={hawkr_pic} className='p-10'/>
                </div>
              {/* Column 2 - Email form */}

              <div className=''>
                <div className="flex flex-col pl-5 pt-44 w-full justify-start items-start bg-white">
                  {/* Sign up segment and text */}
                  <h2 className='text-black md:text-4xl pb-5'> Sign up!</h2>
                  <div className='flex md:text-xl pl-5 pb-8'>
                    <p className='text-slate-500'>You can reach us any time via </p> <p className='pl-1 text-sky-700'> help@hawkr.com</p>
                  </div>

                  {/* Form components below */}
                  <div className=''>
                    <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-[42rem] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <label htmlFor="password" className="block text-xl font-medium text-gray-700 mt-4">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                        placeholder="you@example.com"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                      {/* TODO: Insert Captcha Here */}
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
                      onClick={signUpWithEmail}
                      >
                      Sign up
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className='text-black'>Profile information</p> <br/>
              <h2 className='text-black'> MADE IT INTO SESSION - REMOVE COOKIE</h2>
              {/* <Account session={session}/> */}
            </>
          )}
        </div>
      </>
    )
}

export default signup