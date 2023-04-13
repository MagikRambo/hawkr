
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
        role: 'Front-end Developer',
        description: 'Text goes here',
        imageUrl:
          'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/hawkr_icon.png',
        linkedinUrl: '',
        email: 'alexromero@gmail.com'
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
      <div className="bg-slate-200 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
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

                {person.name === 'Mike Marambio' && (
                <div className="text-black">
                    <p className="pb-4">My name is Mike Marambio, and I am a Computer Science student at the University of Utah, set to graduate in the spring of 2023. As an aspiring software engineer, I am passionate about building scalable and efficient systems, particularly in the areas of Microservices, Distributed Systems, and Containerization.</p>
                    
                    <p className="pb-4"> In addition to my academic pursuits, I am also an undergraduate researcher at the Visual Perception and Spatial Cognition Lab, where I focus on exploring the potential of Mixed Reality. Furthermore, I am honored to serve as Vice President of The Society of Hispanic Professional Engineers (SHPE), a role that has allowed me to connect with fellow students and professionals in the engineering field while promoting diversity and inclusion. </p>
                    
                    <p className="pb-4">My interest in software development has also led me to intern at Microsoft twice. During my first internship, I developed an admin UI and later pivoted the project towards a Full-Stack direction. In my second internship, I created a developer tool to simplify containerization and improve the developer life cycle.</p>
                    
                    <p className="pb-4">When I'm not immersed in coding, I enjoy training, learning new hobbies, and spending quality time with family and friends. After graduation, I plan to continue developing my current project and integrate additional features to benefit small local vendors. I am confident that my skills and experiences will enable me to make a meaningful impact in the software engineering industry.</p>
                 </div>)}
                 {person.name === 'Alex Romero' && (
                    <p>example text here</p>
                 )}

                 {person.name === 'Leo Zhang' && (
                <div className="text-black">
                    <p className="pb-4">Hello my name is Leo, born on Feb  19, 1998 in Tianjin. By chance, I came to the University of Utah and had the most memorable time of my life here.</p>
                    
                    <p className="pb-4">I pursued architecture design in college at beginning, but soon realized my growing interest in computer science and computer graphics. I made the decision to continue his studies in the field at the University of Utah in the United States, and thanks for this choose, I meet a lot of cool guys here. </p>
                    
                    <p className="pb-4">As my undergraduate studies progressed, I became increasingly interested in graphics. I enjoy reading about rendering and the technologies associated with game engines. My biggest dream is to open my own game studio and dedicate myself to providing a better gaming experience for players.</p>                                    
                </div>)}
                <p className="text-base leading-7 text-gray-600">{person.email}</p>
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
    )
  }
  



// export default function about(){


//     return(
//         <>
//         <header>
//             <title> About us!</title>
//         </header>

//         <main className="h-screen w-full bg-slate-200 text-black">

//         <h1 className="text-4xl">About us!</h1>

//         <h1> Hawkr Created by </h1>

//         {/* Grid of 3 separated */}
//         <div>


//         </div>
//         <h1>Mike Marambio | Alex Romero | Leo Zhang</h1>

//         </main>
//         </>
//     )


// }