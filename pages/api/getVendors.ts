import { useSupabaseClient } from '@supabase/auth-helpers-react'
import {createClient} from '@supabase/supabase-js'


async function get_shops_with_location() {
    
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const {data, error} = await supabase.rpc('get_shops_with_location')

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
//console.log(data)


return {data}
}
 
export default get_shops_with_location;
