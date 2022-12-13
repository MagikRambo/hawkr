import { Database } from '../utils/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import {createClient} from '@supabase/supabase-js'


function Test01() {
type shops = Database['public']['Tables']['shops']['Row']

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const shopsID = async () =>{
    let {data, error} = await supabase
    .rpc('get_art_vendors')

    /* NOTE: We will no longer be utilizing imports similar to the ones below: */
    // let { data: vendor_shops, error } = await supabase
    // .from('shops')
    // .select('shopName, profiles!shops_vendorID_fkey(state)')
    // .eq('profiles.state', 2)

    /* Note Part2: We will be utilizing calls as shown on lines 11-13.*/
    // More Calls include:
    // 'get_foodtruck_vendors'
    // 'get_all_vendors'
    // 'get_clothes_vendors'
console.log(data)
}

return ( <><button
            onClick={shopsID}>
                THIS IS A HUGE BUTTON FEAR ME</button> 
            </>);
}
 
export default Test01;
