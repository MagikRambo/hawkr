import { useSupabaseClient } from '@supabase/auth-helpers-react'
import {createClient} from '@supabase/supabase-js'

async function get_vendor_by_id(vendor_id:string) {
    
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)


    // console.log(uuidValidate(shop_id))
    // console.log(uuidStringify(shop_id))

    // console.log(typeof(shop_id))
    


    let { data, error } = await supabase.rpc('get_vendor_by_id', {vendor_id})

    if (error) console.error(error)
    // else console.log(data)


    return {data}
}
    export default get_vendor_by_id
    