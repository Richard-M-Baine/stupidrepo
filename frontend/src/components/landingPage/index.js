import React, { useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


import './landingPage.css'
import LoginFormModal from '../authentication/LoginFormModal/index';
import SignupFormModal from '../authentication/SignupFormModal/index'
import DemoUser from '../Demonstration/index.js'


const LandingPage = () => {


    const navigate = useNavigate()

    const sessionUser = useSelector(state => state.session.user)

    function aboutclick() {
        navigate('/about')
    }
    useEffect(() => {
        if (sessionUser && sessionUser.user) {
          navigate('/mylistings');
        }
      }, [sessionUser, navigate]);
      
      


    return (
        <>
            <div className='sppictureDiv'>
                <div className='sptitleDiv'>
                    <h1 className='spheaderone'>Penguins rely on each other to survive </h1>
                    <h1 className='spheadertwo'>They quickly freeze to death if left alone</h1>
                </div>


            </div>
            <div className='sppictureHumanDiv'>
                <div className='sphumanDiv'>
                    <h1 className='spheaderThree'>Humans are not any different</h1>
                    <h1 className='spheaderFour'>TriState Mutual Aid</h1>
                </div>
                <div className='enlistsplashpage'>
                    <div><LoginFormModal /></div>
                    <button className='buttonsplash' onClick={aboutclick}>About Mutual Aid</button>
                    <div><SignupFormModal /></div>
                    <div><DemoUser /></div>
                </div>



            </div>


        </>
    )
}


export default LandingPage