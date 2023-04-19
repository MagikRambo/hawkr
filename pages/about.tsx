import Link from "next/link"

const hawkrPages = [
  {
    name: 'Home Page',
    description: 'The homepage shows users everything they need to find nearby vendors',
    imageUrl:
      'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/hawkr_homepage.png'
  },
  {
      name: 'Vendor Shops Page',
      description: 'Vendors can easily update their location and information',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/manageshops.png'
    },
    {
      name: 'Vendor Shops Page cont.',
      description: 'The edit page for a vendor',
       imageUrl:
       'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/hawkr_editshopspage.png'
  },
]

const technologies = [
  {
    name: 'Next (React Framework)',
    description: 'layout...',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/nextjs.png'
  },
  {
    name: 'Typescript',
    description: 'layout...',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/typescript.png'
  },
  {
    name: 'AWS - Amplify',
    description: 'layout...',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/aws.png'
  },
  {
    name: 'Supabase - DB,CDN,AUTH',
    description: 'layout...',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/supabase.png'
  }
]

const architectures = [
  {
    name: 'Architecture Diagram 1',
    description: '.....',
    imageUrl:
    'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/hawkr_architecture.png'
  },
  {
    name: 'Architecture Diagram 2',
    description: '.....',
    imageUrl:
    'xxxxx'
  }
]

export default function About() {
  return (
    <div className="bg-slate-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-4 content-start">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About The Hawkr Project</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Hawkr is a Website/Mobile application which intends to bridge the gap between mobile vendors 
          and cutomers/clients. Using AWS Services, React, NextJs, Tailwind, Supabase, and Google Maps 
          API's we intend to create an all in one application which will create and bring these mobile 
          vendor communities together.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          In the world of small mobile businesses location is critical, but often left unknown to the clients. 
          Pop-up shops, and food trucks are often difficult to track down since they often move from location 
          to location, thus making it difficult for customers to find where their favorite businesses are. Tourists,
           visitors, and those looking to try something new find locating mobile businesses without knowing of them
            first is virtually impossible. The solution to this is Hawkr. The Hawkr app will serve all small mobile 
            vendors connecting them with customers who are interested in supporting them. This means that everyone 
            in the entire community can locate and identify new and existing businesses in the vicinity through the 
            use of Hawkrs mapping. Through the use of this web-app, youll find your favorite mobile businesses and identify new ones!
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-14 gap-y-4 sm:grid-cols-1 lg:mx-0 lg:max-w-md lg:grid-cols-2"
        >
          {technologies.map((technologies) => (
            <li key={technologies.name}>
              <img className="h-40 md:max-w-l  rounded-xl object-fit border-2 border-rose-400 shadow-xl" src={technologies.imageUrl} alt="" />
              <h3 className="mt-2 text-lg font-semibold leading-8 tracking-tight text-gray-900">{technologies.name}</h3>
              <p className="pb-4 text-sm text-black">
                  {technologies.description}
              </p>
            </li>
          ))}
        </ul>
        </div>
        <div className="bg-slate-200 py-4 sm:py-15">
          <h2 className="text-xl py-8 font-bold tracking-tight text-gray-900 sm:text-2xl">How to use Hawkr</h2>
          <ul className="grid grid-cols-3 gap-x-8 gap-y-4 sm:grid-cols-2 lg:mx-0 lg:max-w-full lg:grid-cols-4">
          
          {hawkrPages.map((hwkrPage) => (
            <li key={hwkrPage.name}>
              <img className="h-40 w-full rounded-xl object-fit" src={hwkrPage.imageUrl} alt="" />
              <h3 className="mt-2 text-lg font-semibold leading-8 tracking-tight text-gray-900">{hwkrPage.name}</h3>
              <p className="pb-4 text-sm text-black">
                  {hwkrPage.description}
              </p>
            </li>
          ))}
          </ul>
        </div>
        <div className="bg-slate-200 py-9 sm:py-15">
          <Link className="sm:text-3xl text-[#2563eb]" href='/teamMembers' >Meet the Team!</Link>
        </div>
      </div>
    </div>
  )
}

