const hawkrPages = {
  HomePage: [{
    name: 'Home Page',
    description: 'Hawkr allows anyone the ability to find nearby vendors, even without an account.',
    imageUrl:
      'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/hawkr_homepage.png'
  },
  {
    name: 'Hawkr Types',
    description: 'You can browse through the following types! FoodTrucks, Clothes, Art. Browse specific types.',
    imageUrl:
      'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/HawkrTypes.png?t=2023-04-21T02%3A59%3A37.979Z'
  },
  {
    name: 'Shop Card',
    description: 'When viewing a vendor you can see their descriptions as well as get directions to them.',
    imageUrl:
      'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/shopCard.png'
  }

],

  AccountCreation: [
    {
      name: 'Signing up',
      description: 'Creating and verfiying your account is done simple.',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/sign_up_1.png'
    },
    {
      name: 'Favorites',
      description: 'You can then save your favorite vendors and find them later.',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/favorites_2.png'
    },

    {
      name: 'Profile',
      description: 'You can also edit your profile page information.',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/my_profile.png'
    }],

  BecomingVendor: [
    {
    name: 'Becoming Vendor 1',
    description: 'To become a vendor you must first go through our application process.',
    imageUrl:
      'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/become_vendor.png'
  }],

  BuildingOwnShop: [
    {
      name: 'Where to find ManageShops',
      description: 'Once approved you will gain access to the Manage Shops page',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/manage_shops1.png'
    },
    {
      name: 'Creating your shop / edit shop form',
      description: 'Form containing information that when completed allows for shops to be available.',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/manage_shops2.png'
    },
    {
      name: 'Open/Close Shop',
      description: 'Opening/Closing your shop is simple. Just set your availability and using the on/off toggle when you are ready to begin (photo)',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/manage_shops_page.png'},
    {
      name: 'Shop Form pt.1',
      description: 'When Creating/Editing your shop, you would need to fill in the following information such as Shop Name, Description, Photo, Type, Time, optional(live-tracking)',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/manage_shops_edit1.png'
    },
    {
      name: 'Shop Form pt.2',
      description: 'Continuation description of pt.1',
      imageUrl:
        'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/about/manage_shops_edit2.png'
    }]
}

const technologies = [
  {
    name: 'Next (React Framework)',
    description: 'Next.js is a React framework for building SSR/SSG web apps with automatic code splitting, optimized performance, and easy deployment. It also supports CSR, dynamic routing, and API routes.',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/nextjs.png'
  },
  {
    name: 'Typescript',
    description: 'TypeScript is a superset of JavaScript that adds static typing, interfaces, and other features to enhance code safety, readability, and maintainability in large-scale applications.',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/typescript.png'
  },
  {
    name: 'AWS - Amplify',
    description: 'AWS Amplify is a development platform that enables developers to build scalable and secure cloud-powered web and mobile applications with a unified CLI, libraries, and UI components.',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/aws.png'
  },
  {
    name: 'Supabase - DB,CDN,AUTH',
    description: 'Supabase is an open-source backend as a service (BaaS) that provides a real-time database, authentication, and REST API generation.',
     imageUrl:
     'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/supabase.png'
  }
]

const people = [
  {
    name: 'Mike Marambio',
    role: 'Full-Stack Developer',
    imageUrl:
      'https://www.mikemarambio.com/images/profile.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/mike-marambio/',
    email: 'mikemarambio@gmail.com'
  },
  {
      name: 'Alex Romero',
      role: 'Full-Stack Developer',
      description: 'Text goes here',
      imageUrl:
        'https://alex-romero.vercel.app/selfie.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/alex--romero/',
      email: 'alexander--romero@outlook.com'
    },
    {
      name: 'Leo Zhang',
      role: 'Front-end Developer | Aspiring Game Developer ',
       imageUrl:
        'https://hakkerbarry.com/images/Me.png',
      linkedinUrl: 'https://www.linkedin.com/in/zixuanzhang1998/',
      email: 'zixuanzhang1998@gmail.com'
  },
]

export default function About() {
  return (
    <div className="bg-slate-200 py-24 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-4 content-start">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About The Hawkr Project</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Hawkr is a Website/Mobile application which intends to bridge the gap between mobile vendors 
          and cutomers/clients. Using AWS Services, React, NextJs, Tailwind, Supabase, and Google Maps 
          APIs we intend to create an all in one application which will create and bring these mobile 
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
          className="relative mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-14 gap-y-4 sm:grid-cols-1 lg:mx-0 lg:max-w-md lg:grid-cols-2"
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
        
        {/* Architecture */}
        <div className="bg-slate-200 py-4 sm:py-15">
          <h2 className="place-items-center text-xl py-8 font-bold tracking-tight text-gray-900 sm:text-2xl">Hawkr Architecture</h2>
          <ul className="grid place-items-center grid-cols-1 gap-x-8 gap-y-4lg:mx-0 lg:max-w-full ">
          
            <li>
              <img className=" sm:h-60 sm:max-w-2xl  lg:h-80   rounded-xl object-fit" src={'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/hawkr_architecture.png'} alt="" />              
              <div className="mx-auto max-w-7xl px-4 lg:px-6 grid grid-cols-2 gap-2 content-start">

                {/* col-1 */}
                <div className="col-span-1 pb-4 w-full  text-sm text-black">
                  <p> Front End</p>

                    <ul className="list-disc ">
                      <li className="ml-8 ">
                        <p>Next.js</p>
                      </li>
                      <li className="ml-8 ">
                        <p>Node.js</p>
                      </li>
                      <li className="ml-8">
                        <p>Typescript</p>
                      </li>
                      <li className="ml-8">
                          <p>Tailwind</p>
                      </li>
                      <li className="ml-8">
                        <p>Styled Components</p>
                      </li>
                    </ul>
                </div>
                  {/* col-2 */}
                <div className="col-span-1 pb-4 w-full text-sm text-black ">
                  <p>BackEnd</p>
                  <ul className="list-disc ">
                    <li className="ml-8">
                      Supabase
                    <li className="ml-8 ">
                      AUTH
                    </li>
                    <li className="ml-8 ">
                      CDN
                    </li>
                      <li className="ml-8">
                        PostgreSQL Database
                        <ul className="list-disc">
                          <li className="ml-8">
                            Policies
                          </li>
                          <li className="ml-8">
                            Triggers
                          </li>
                          <li className="ml-8">
                            Functions
                          </li>
                        </ul>
                      </li>
                    </li>
                  </ul>
                </div>

              {/* col-1 row-2 */}
              <div className="col-span-1 pb-4 w-full text-sm text-black ">
                  <p>APIs</p>
                  <ul className="list-disc ">
                    <li className="ml-8 ">
                      <p>Google APIs</p>
                    </li>
                    <li className="ml-8">
                      <p>Supabase APIs</p>
                    </li>
                  </ul>
                </div>
                {/* col-2 row-2 */}
                <div className="col-span-1 pb-4 w-full text-sm text-black ">
                  <p>Deployment</p>
                  <ul className="list-disc ">
                    <li className="ml-8 ">
                      <p>AWS-Amplify</p>
                    </li>
                    <li className="ml-8">
                      <p>AWS-Route 53</p>
                    </li>
                    <li className="ml-8">
                        <p>Google Domains</p>
                    </li>
                    <li className="ml-8">
                      <p>SSL Certification</p>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>


        {/* How To Use Hawkr */}
        <div className="bg-slate-200 py-4 sm:py-15 text-black">
          <h2 className="text-xl py-8 font-bold tracking-tight text-gray-900 sm:text-2xl">How to use Hawkr</h2>
          {/* Blurb */}
          <h3 className="pb-8">Hawkr is a versatile web application that simplifies the process of connecting local and mobile vendors with clients. 
            Its intuitive interface allows users to effortlessly explore nearby shops or filter by type, making it easier to discover new and exciting offerings. 
            Moreover, vendors can easily create and edit their shops, update their details and even opt for live tracking, providing an intuitive customer and vendor experience. 
            Hawkr offers a robust and user-friendly platform, providing vendors with essential tools to manage their business and reach a broader audience, while also offering customers an easy-to-use platform for finding the products and services they need. 
            With Hawkr, locating your next mobile vendor is one-click away!</h3>

          <h1 className="text-2xl font-bold border-b-2 border-gray-400 mb-2 w-44 pl-4 py-4 hover:text-gray-500 hover:border-blue-300">Homepage</h1>
          <ul 
          className="relative  grid grid-cols-1 gap-y-4 md:gap-x-8 sm:grid-cols-1 lg:mx-0 lg:max-w-full lg:grid-cols-3 mx-auto"
          >
          {/* Home page */}
          {hawkrPages.HomePage.map((hwkrPage) => (
            <li 
            key={hwkrPage.name}
            className="col-span-1 ">
              
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
                <img className="w-full h-64" src={hwkrPage.imageUrl} alt=""/>
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="font-bold text-xl mb-2 \">{hwkrPage.name}</div>
                  <p className="text-gray-700 text-base">
                   {hwkrPage.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
          </ul>


          <h1 className="text-2xl font-bold border-b-2 border-gray-400 mb-2 w-44 pl-4 py-4 hover:text-gray-500 hover:border-blue-300">Account Creation</h1>
          <ul 
          className="relative  grid grid-cols-1 gap-y-4 md:gap-x-8 sm:grid-cols-1 lg:mx-0 lg:max-w-full lg:grid-cols-3 mx-auto"
          >
          {/* Account Creation */}
          {hawkrPages.AccountCreation.map((hwkrPage) => (
            <li 
            key={hwkrPage.name}
            className="col-span-1 ">
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
                <img className="w-full h-64" src={hwkrPage.imageUrl} alt=""/>
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="font-bold text-xl mb-2 \">{hwkrPage.name}</div>
                  <p className="text-gray-700 text-base">
                   {hwkrPage.description}
                  </p>
                </div>
              </div>

            </li>
          ))}
          </ul>

          <h1 className="text-2xl font-bold border-b-2 border-gray-400 mb-2 w-44 pl-4 py-4 hover:text-gray-500 hover:border-blue-300">Becoming a Vendor</h1>
          <ul 
          className="relative  grid grid-cols-1 gap-y-4 md:gap-x-8 sm:grid-cols-1 lg:mx-0 lg:max-w-full lg:grid-cols-3 mx-auto"
          >
          {/* Becoming Vendor */}
          {hawkrPages.BecomingVendor.map((hwkrPage) => (
            <li 
            key={hwkrPage.name}
            className="col-span-1 ">
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
                <img className="w-full h-64" src={hwkrPage.imageUrl} alt=""/>
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="font-bold text-xl mb-2 \">{hwkrPage.name}</div>
                  <p className="text-gray-700 text-base">
                   {hwkrPage.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
          </ul>

          <h1 className="text-2xl font-bold border-b-2 border-gray-400 mb-2 w-44 pl-4 py-4 hover:text-gray-500 hover:border-blue-300">Building your own shop</h1>
          <ul 
          className="relative  grid grid-cols-1 gap-y-4 md:gap-x-8 sm:grid-cols-1 lg:mx-0 lg:max-w-full lg:grid-cols-3 mx-auto"
          >
          {/* Building your own shop */}
          {hawkrPages.BuildingOwnShop.map((hwkrPage) => (
            <li 
            key={hwkrPage.name}
            className="col-span-1 ">
              
              <div className="max-w-sm rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
                <img className="w-full" src={hwkrPage.imageUrl} alt=""/>
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="font-bold text-xl mb-2 \">{hwkrPage.name}</div>
                  <p className="text-gray-700 text-base">
                   {hwkrPage.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>

      {/* Team Members Side */}
      <div className="bg-slate-200 py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best results for our clients.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {people.map((person) => (
              <li key={person.name}>
                <img className="aspect-[2/2] w-full rounded-2xl object-cover" src={person.imageUrl} alt="" />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-gray-600 pb-4">{person.role}</p>

                <div className="text-black">
                {person.name === 'Mike Marambio' && (
                    <>
                    <p className="pb-4">My name is Mike Marambio, and I am a Computer Science student at the University of Utah, set to graduate in the spring of 2023. As an aspiring software engineer, I am passionate about building scalable and efficient systems, particularly in the areas of Microservices, Distributed Systems, and Containerization.</p>
                    <p className="pb-4">In addition to my academic pursuits, I am also an undergraduate researcher at the Visual Perception and Spatial Cognition Lab, where I focus on exploring the potential of Mixed Reality. Furthermore, I am honored to serve as Vice President of The Society of Hispanic Professional Engineers (SHPE), a role that has allowed me to connect with fellow students and professionals in the engineering field while promoting diversity and inclusion. </p>
                    <p className="pb-4">My interest in software development has also led me to intern at Microsoft twice. During my first internship, I developed an admin UI and later pivoted the project towards a Full-Stack direction. In my second internship, I created a developer tool to simplify containerization and improve the developer life cycle.</p>
                    <p className="pb-4">When I am not immersed in coding, I enjoy training, learning new hobbies, and spending quality time with family and friends. After graduation, I plan to continue developing my current project and integrate additional features to benefit small local vendors. I am confident that my skills and experiences will enable me to make a meaningful impact in the software engineering industry.</p>
                    </>)}
                {person.name === 'Alex Romero' && (
                    <>
                    <p className="pb-4">My name is Alex, I am a student studying Computer Science at the University of Utah. I plan on graduating Spring of 2023 with a bachelors degree and I am currently seeking employment opportunities. During my time as an undergraduate, I grew a strong interest in Backend Development and Reverse Software Engineering.</p>
                    <p className="pb-4">I have spent approximately 2-3 years employed as Software/Systems Engineer for Blendtec located in Orem. During this time gained valuable experience and understanding of custom manufacturing ERP systems. The I.T team at Blendtec was a small, thus my duties as a Software Engineer required that i be in charge of several companywide systems. These included the custom code in Microsoft Dynamics AX, Microsoft SQL, All Amazon Web Services, Active Directory, and the Company Seller site. Much of the work ment that occasionally I soley debuged, repaired, created custom software, and performed serval important updates to websites/systems. I also gained valuable communication skills since a primary function became to speak with employees in every department to gain a deeper understanding of problems/bugs(submitted through Jira onto a Kanban board) which they would encounter. Often, i would educate new/old memebers on performing tasks using Blendtec custom Software.</p>
                    <p className="pb-4">Outside of Computing I enjoy the great outdoors. I have visited many places with the intention to either camp, backpack, or hike. Although this is not an exhaustive list, I have visited, Iceland, Canada, Hawaii, Oregon, Washington Montana, Colorado, and California. I also enjoy doing performance car modifications and discovering new music.</p>
                    </>)}

                 {person.name === 'Leo Zhang' && (
                    <>
                    <p className="pb-4">Hello my name is Leo, born on Feb  19, 1998 in Tianjin. By chance, I came to the University of Utah and had the most memorable time of my life here.</p>
                    <p className="pb-4">I pursued architecture design in college at beginning, but soon realized my growing interest in computer science and computer graphics. I made the decision to continue my studies in the field at the University of Utah in the United States, and thanks for this choose, I meet a lot of cool guys here. </p>
                    <p className="pb-4">As my undergraduate studies progressed, I became increasingly interested in graphics. I enjoy reading about rendering and the technologies associated with game engines. My biggest dream is to open my own game studio and dedicate myself to providing a better gaming experience for players.</p>                                    
                    </>)}
                </div>
                <p className="text-base leading-7 text-gray-600">Email: {person.email}</p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  <li>
                    <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-7 w-7" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
    
  )
}

