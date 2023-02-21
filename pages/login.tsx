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

const login: NextPage = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    
    return (
      <>
        <div className='bg-white' style={{ padding: '50px 0 100px 0' }}>
          {!session ? //if (!user)
          (
            <div className='grid grid-cols-2 '>
                <div className='border-r border-r-slate-700 m-5'>
                    {/* <h2 className='text-black'> THIS IS LEFT</h2> */}
                    <Image width={8000} height={10000} alt="hawkr logo" src={hawkr_pic} className='p-10'/>
                </div>

                <div className={styles.row}>
                <div className={styles.col}>
                </div>
                <div className={styles.auth}>
                    <h1 className='text-black text-4xl '>Log in!</h1>
                    <Auth
                    redirectTo="./"
                    providers={['github', 'google', 'apple']} 
                    appearance={{theme: ThemeSupa}}
                    supabaseClient={supabase} theme="dark" />
                </div>
                </div>
            </div>
          ) : (
            <>
              <p>Profile information</p> <br/>
              <Account session={session}/>
            </>
          )}
        </div>
      </>
    )
}

export default login