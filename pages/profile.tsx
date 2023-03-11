import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import styles from '../styles/supabasestyling.module.css'
import { useEffect, useState } from 'react'
import { stat } from 'fs'

const Profile: NextPage = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    
    return (
      <>
        <div className={styles.container} style={{ padding: '50px 0 100px 0' }}>
          {!session ? //if (!user)
          (
            <div className={styles.row}>
              <div className={styles.col}>
              </div>
              <div className={styles.auth}>
                <Auth
                redirectTo="./"
                providers={['github', 'google', 'apple']} 
                supabaseClient={supabase} theme="dark" />
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

export default Profile