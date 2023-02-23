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
import { useRouter } from 'next/router'

const login: NextPage = () => {
    const sessionTHING = useSession()
    console.log("sessionTHING: ", sessionTHING)

    // const supabase = useSupabaseClient()
    const user = useUser()
    console.log("USER FROM AUTH UI: ", user)

    
    const [session, setCurSession] = useState(false);
    const [dataV, setDataV] = useState<any>()
    
    useEffect(() => {

      const getSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        
        if(data){
          console.log("USE STATE DATA: ",data)
          setDataV(data.session)
          // setCurSession(true)
        }

      }
      getSession()
    }, [])

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [triggerStatus, setTriggerStatus] = useState(false);
    const router = useRouter()

    // useEffect(() => {
    //   async function createProfile(){
    //     try{
    //       if (!user) throw new Error('No user')
  
    //       const updates = {
    //         UUID: user.id,
    //         state: 1,
    //         name: user.email,
    //         description: "Welcome to my profile!"
    //       }
  
    //       let { error } = await supabase.from('profiles').upsert(updates)
    //       if (error) throw error
    //       //alert('Profile updated!')
    //     }
    //     catch (error) {
    //       alert('Error updating the data!')
    //       console.log(error)
    //     }
    //   }
    //   createProfile()
    // }, [user])
    async function signInWithEmail(){
        try{
            if (email && password){
                const resp = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                    
                });

                if (resp.error) throw resp.error;

                const userId = resp.data.user?.id;
                console.log("userId: ", userId)
                setTriggerStatus(true);

                {/* Add to Database User*/}


                // console.log(data)
                // router.push('/')
            }
            
        }catch{
            /* INSERT CATCH HERE IF HERE */
        }
    }

    // console.log(session)
    return (
      <>
        <div className='bg-white' style={{ padding: '50px 0 100px 0' }}>
          {!session ? 
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
                  <h2 className='text-black md:text-4xl pb-5'> Login</h2>
                  <div className='flex md:text-xl pl-5 pb-8 text-slate-500'>
                    <p>You can reach us any time via  <span className='pl-1 text-sky-700'> help@hawkr.com</span></p>
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
                        className="block md:w-full lg:w-[36rem] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
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
                        placeholder="Insert password here"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                      {/* TODO: Insert Captcha Here */}
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
                      onClick={signInWithEmail}
                      >
                      Log in
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>):
            (

              <div className='text-black '>
              <h2 className='text-black'> THIS IS THE SESSION INFO DATA</h2>
            </div>
            )}
        </div>
      </>
    )
}

export default login