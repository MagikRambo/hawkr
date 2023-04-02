import {createClient} from '@supabase/supabase-js'

async function get_shops_by_id(shop_id:string) {
    
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const {data, error} = await supabase.rpc('get_shops_by_id', {shop_id})
        
    
    return {data}
    }
     
    export default get_shops_by_id;
    