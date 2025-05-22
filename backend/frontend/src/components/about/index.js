import React from 'react'

import { useNavigate } from 'react-router-dom'
import './about.css'

function About() {
    const navigate = useNavigate()
    
    function goHome() {
        navigate('/')
    }

    window.scrollTo(0, 0)
    return (

    
        <div className='backgroundcoloraboutdiv'>
            <div className='aboutmutualaidoutdiv'>
            <div autofocus className='introwebmasterdiv'>
                <h2 autofocus className='webmaster'>Contact Developer</h2>
                <div className='personalinforowdiv'>
                    <h3 className='Developerinfo'><a target='_blank' rel="noreferrer" className='developerlink' href='mailto: richardbaine@gmail.com'>Email</a></h3>
                    <h3 className='Developerinfo'><a target='_blank' rel="noreferrer" className='developerlink' href='https://github.com/Richard-M-Baine'>GitHub</a></h3>
                    <h3 className='Developerinfo'><a target='_blank' rel="noreferrer" className='developerlink' href='https://www.linkedin.com/in/richard-baine-87184b29/'>LinkedIn</a></h3>
                </div>
            </div>
            <button className='topaboutgohomebutton' autofocus onClick={goHome}>Back To Home</button>
            </div>

               

         

            
            <div className='aboutmutualaidoutdiv'>
                <h1 className='aboutheaderone'>What is Mutual Aid?</h1>
                <div className='intropartaboutdiv'>
                    <h3 className='headerthreeabout'>We are going to talk about biology for a bit.</h3>
                    <p className='paragraphaboutdiv1'> Evolution is normally described as being “the survival of the fittest.”  This quote was often used at the turn of the 20th century to describe the behavior of people and nation states.  Nations that were “weak” would naturally be preyed upon by more powerful nations.  Ditto for the poor being preyed upon by the wealthy and powerful. They were simply not strong enough. You can understand how this was used to justify both crushing the poor inside a country and condone imperialism outside of it.  This became a sociological theory called Social Darwinism.  </p>
                    <p className='paragraphaboutdiv1'> The counterpoint of course is that there is tremendous amounts of cooperation amongst communities, nations, (and species).  Perhaps this is the better option to survive in an otherwise merciless universe?  Peter Kropotkin, a biologist in what was then Czarist Russia, popularized this concept.  Let’s go back to the example of the penguins on the home page.  They would freeze to death if left alone.  They just don’t huddle together for warmth. They actually take turns on the outside where their back is exposed to the cold and wind!  Humans commit horrific atrocities against each other but also care for the weak and less fortunate. Kropotkin found this paradox compelling and he became a pioneer when it came to documenting the cooperative aspects amongst species. </p>
                    <p className='paragraphaboutdiv1'> His seminal book on this topic, Mutual Aid: A Factor In Evolution, was based
                        on observing both wildlife and tribal communities in Siberia.  In parts both a scientific and anthropological study.
                        People who fended for themselves in this climate were one broken leg from freezing or starving to death.
                        Your chances were far greater if you were a member of a tribal community who could lend you aid.  Birds who stayed put for the winter would have
                        to little food for everyone to survive.  For this reason the majority migrated to warmer climates.  During this process they would cooperate while flying.  Taking turns in front of a V “formation” the birds in the rear could rest by drafting.  The same process as in automobile racing or competitive cycling.  </p>
                </div>


                <div className='intropartaboutdiv'>
                    <h2 className='headerthreeabout'>So is this another charity?</h2>
                    <p className='paragraphaboutdiv1'>Kropotkin later became what was later known as an Anarchist and his political beliefs are what he is more well known about today.  A belief that differs from communism in that it believes that power disparities, both government and corporate based, need to be flattened.  Many charitable organizations have chains of command just as elaborate as Apple, Boeing and other corporations.  The people on the top naturally receive the most perks.  They also have a significant role in playing who deserves and who do not deserve assistance.  You can understand that when it comes to housing, food, or financial assistance their own personal opinions can outplay any objective reasoning.     </p>
                    <p className='paragraphaboutdiv1'>Mutual aid thus borrows the term from Kropotkin but also embrace his anarchist credentials.  Instead of a charity influencing who deserves, and who doesn’t deserve assistance, mutual aid believes in the concept of “people directly helping people.”  A classic example is Food not Bombs, a loosely based federation of independent pop-up food pantries.  Anyone can volunteer and anyone can receive food.  No questions asked.  Sikhism and Sufism have a similar process called Langar.  Compared to related charities decisions are governed by consensus and the scope is comparatively local.      </p>
                    <p className='paragraphaboutdiv1'>Rationalism dictates that charitable organizations exist and will continue to exist for the indefinite future.  Their benefits generally outweigh their detriments.  The creator of this site has worked in the non-profit industry his entire professional career.  Thus up to date listings can enable individuals to locate services in their community.  The current listings will be transformed into a wiki style format enabling up to date information to be presented and edited at will.  There are similar listings on other sites but naturally if governed and / or updated by one individual they tend to become inactive after a while.       </p>
                    <p className='paragraphaboutdiv1'>Technology has the power to bring people together. This site currently allows anyone in the world to post a request for help.  Messaging will allow anyone with an account to answer that call for assistance.  In this aspect we are attempting to move mutual aid from theory into reality.  Many other groups embrace this modal but this amongst the first that I know of that is utilizing technology to having individuals spontaneously being able to ask for and receive help.  The webmaster / organizers purposefully stepping out of the picture.  There is no shame to attempt to transform this world into a better place. No matter your history or what your qualifications are it is never to late to try to help another human being. </p>
                    <p className='paragraphaboutdiv1'>It is also no shame to ask for help as well.  People would not be able to give if people are unwilling to receive. Muhammad mentioned that the benefits of charity are divided in half between the person who gives it and the person who receives it.  Thank you for reading this page.  Feel free to contact me for any tips, advice or comments.  I am also always interested in collaborating with similar projects.</p>
                </div>

                <div  className='introwebmasterdiv'>
                <h2  className='webmaster'>Contact Developer</h2>
                <div className='personalinforowdiv'>
                    <h3 className='Developerinfo'><a target='_blank' rel="noreferrer" className='developerlink' href='mailto: richardbaine@gmail.com'>Email</a></h3>
                    <h3 className='Developerinfo'><a target='_blank' rel="noreferrer" className='developerlink' href='https://github.com/Richard-M-Baine'>GitHub</a></h3>
                    <h3 className='Developerinfo'><a target='_blank' rel="noreferrer" className='developerlink' href='https://www.linkedin.com/in/richard-baine-87184b29/'>LinkedIn</a></h3>
                </div>
            </div>
         
            <div className='intropartaboutdivelast'>
                <button className='aboutGoHomeButton' onClick={goHome}>Back To Home</button>

            </div>
        </div>





        </div >
    )
}

export default About