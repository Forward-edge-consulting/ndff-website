import Navbar from "../Components/Navbar";
import './home.css';

function Home(){
    return(
        <div>
            <Navbar/>

            <section className='flex justify-center flex-col items-center mt-20'>
                
                <article className='w-[60%] text-center pt-10 flex flex-col justify-center'>
                    
                    <div className='pt-3.5 pb-6 w-[38%] self-center text-center'>
                        <p className='border-solid border-2 border-red-600 rounded-2xl'>Connect. Innovate. Transform.</p>
                    </div>
                    
                    <div className='text-center self-center w-[95%] '>
                        <h1 className='text-[#2b9e05] font-JimNightshade text-[5rem] leading-15'>NIGERIA DIGITAL FUTURE FORUM 2026</h1>
                    </div>

                    <div className='text-center self-center w-[60%] my-16'>
                        <p>Driving Nigeria's Digital Future Through Innovation and Collaboration</p>
                    </div>

                    <div className='grid grid-cols-2'>
                         <div>
                            <p className='text-sm text-gray-500'>Date</p>
                            <p>28–30 October 2026</p>
                        </div>
                    
                        <div>
                            <p className='text-sm text-gray-500'>Location</p>
                            <p>LCCI Conference and Exhibition Centre</p>
                            <p className='text-sm text-gray-700 font-bold'> Alausa, Ikeja, Lagos</p>
                        </div>
                    </div>

                </article>
                    <div className='flex gap-4 justify-center pt-10 pb-10 w-[110%]'>
                        <button className='bg-green-500 pb-2.5 pt-2.5 pr-8 pl-8 rounded-3xl text-center'>Register to Attend</button>
                        <button className='bg-green-500 pb-2.5 pt-2.5 pr-8 pl-8 rounded-3xl text-center'>Become a Sponsor</button>
                        <button className='bg-green-500 pb-2.5 pt-2.5 pr-8 pl-8 rounded-3xl text-center'>Exhibit at NDFF</button>     
                        <button className='bg-green-500 pb-2.5 pt-2.5 pr-8 pl-8 rounded-3xl text-center'>Explore Programme</button>
                    </div>
            </section>



            <section>
                <h1>What is NDFF?</h1>
                <article>
                    <p>The Nigeria Digital Future Forum brings together government, industry, academia, innovators, entrepreneurs, technology professionals and emerging talent to explore the technologies, partnerships and ideas shaping Nigeria's digital future.</p>
                        {/* Make these six areas card/icons */}
                        <div>
                            <div>Artificial Intelligence</div>
                            <div>Cybersecurity</div>
                            <div>Digital Transformation</div>
                            <div>Emerging Technologies</div>
                            <div>Digital Skills</div>
                            <div>Innovation</div>
                        </div>
                </article>
            </section>

            <section>
                <h1>Why attend?</h1>
                <article>
                     {/* I would make five cards: */}
                    <div>
                        <p>Government & Public Sector</p>
                        <p>Engage industry leaders, technology providers and policymakers around digital transformation,e-Governance, cybersecurity and emerging technologies.</p>
                    </div>

                    <div>
                        <p>Business & Industry Leaders</p>
                        <p>Discover emerging solutions, meet decision-makers, build partnerships and explore opportunities created by Nigeria' digital transformation.</p>
                    </div>

                    <div>
                        <p>Technology Professionals</p>
                        <p>Learn from industry experts, discover emerging technologies and connect with organisations shaping the sector.</p>
                    </div>

                    <div>
                        <p>Startups & Founders</p>
                        <p>Showcase solutions, meet potential partners and customers, connect with investors and participate in the innovation ecosystem.</p>
                    </div>

                    <div>
                        <p>Students & Emerging Talent</p>
                        <p>Discover technology careers, participate in skills and innovation activities and connect with employers and industry professionals.</p>
                    </div>
                </article>    
            </section>

            <section>
                <h1>The Experience</h1>
                <article>
                    {/* I would make five cards: */}
                    <div>
                        <p>Government–Industry Dialogue</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>

                    <div>
                        <p>AI & Emerging Technology</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>
                    
                    <div>
                        <p>Cybersecurity Forum</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>
                    
                    <div>
                        <p>Innovation & Startup Exhibition</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>
                    
                    <div>
                        <p>Student Innovation Challenge</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>
                    
                    <div>
                        <p>Career & Skills Hub</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>
                    
                    <div>
                        <p>Networking</p>
                        <p>Title</p>
                        <p>Short description</p>
                        <p>Format</p>
                    </div>

                    {/* 
                        ---Each card can have:---
                            Title
                            Short description
                            Format
                    */}

                    {/* 
                        AI & Emerging Technology

                        Practical conversations and demonstrations around
                        Artificial Intelligence and emerging technologies.

                        Keynotes • Panels • Demonstrations • Showcases 
                    */}

                </article>
            </section>

            <section>
                <h1>Three-Day Programme</h1>
                <article>
                    <div>
                        <h3>Day1</h3>
                        <p>Arrival, Accreditation & Official Opening</p>
                        <ul>
                            <li></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Day2</h3>
                        <p>Government, Industry & Technology</p>
                        <ul>
                            <li></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Day3</h3>
                        <p>Innovation, Digital Talent & Closing</p>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                    
                </article>
                    <div>
                        <button> EXPLORE FULL PROGRAMME </button>
                    </div>
                {/* Then list the activities beneath each. */}
            </section>
        </div>
    )
}

export default Home;