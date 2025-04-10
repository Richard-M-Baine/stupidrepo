import React, { useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';


// thunk imports

import { createGroupThunk } from '../../../store/groups'

import './createGroup.css'


function CreateGroupForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session?.user?.userName)

    // thunk loading part
 

    //location part
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [county, setCounty] = useState('')
    const [country, setCountry] = useState('us')
    const [postalCode, setPostalCode] = useState('')

    //group part
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [purpose, setPurpose] = useState('')
    const [privatee, setPrivatee] = useState('')

    // form part
    const [part, setPart] = useState('Part One')


    const USstates = [
        'AL', 'AK', 'AS', 'AZ', 'AR',
        'CA', 'CO', 'CT', 'DE', 'DC',
        'FM', 'FL', 'GA', 'GU', 'HI',
        'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PW', 'PA',
        'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VI', 'VA',
        'WA', 'WV', 'WI', 'WY'
    ];


    const submit = async e => {
        e.preventDefault()


        const newGroup = {
            founder: sessionUser,
            name: name,
            about: about,
            purpose: purpose,

            private: privatee,
            address: address,
            city: city,
            county: county,
            state: state,
            country: country,
            postalCode: postalCode
        }


        await dispatch(createGroupThunk(newGroup))


        navigate('/mylistings')

    }


    if (!sessionUser) {
        navigate('/')
    }

    return (

        <form className='createGroupForm' onSubmit={submit}>

            <h2 className='createGroupPartDiv'>
                {part} of Three
            </h2>
            {
                part === 'Part One' && (
                    <div className='createGroupPartOne'>

                        <div className='createGroupPartOneFlavorText'>
                            <h1 id='cfponeheader'>Enter The Organization's Address</h1>
                            <p className='cfponeParagraph'>If this charity / organization meets and / or serves various locations it is usually best to enter an individual listing for each one. This way the information can be tailored to the location.  This also helps with searching in a geographical area.  If this group has no fixed address please enter some place where someone can physically contact someone.  We also suggest that you explain that you have no fixed address in the about section (Part 3) along with a phone number / email you can be contacted with etc.</p>
                            <p className='cfponeParagraph'>Furthermore, the address does not have to be a valid address and uses google maps api for mapping / geocoding. Feel free to enter the nearest street corner in the address section or describe the area. "Lakewood Town Square" or "Clifton Ave and 3rd Street" are good examples.  To help with searching please enter <a target="_blank"  rel="noreferrer" className='stateabbreviationlink' href='https://www.faa.gov/air_traffic/publications/atpubs/cnt_html/appendix_a.html'>the appropriate state abbreviation.</a></p>
                            <p className='cfponeParagraph'>You can always alter the address later.  For security / privacy reasons the 'your location' in google maps has been disabled.</p>
                        </div>
                        <div className='createGroupPartOneDiv'>
                            <label className='createGrouppartonelabel'>Address</label>
                            <input
                                className='createGroupPartOneInput'
                                id='cgpoinputone'
                                type='text'
                                maxLength='70'
                                placeholder='please enter between 2 and 70 characters'
                                onChange={text => setAddress(text.target.value)}
                                value={address}
                            />
                        </div>

                        <div className='createGroupPartOneDiv'>
                            <label className='createGrouppartonelabel'>City</label>
                            <input
                                className='createGroupPartOneInput'
                                id='cgpoinputtwo'
                                type='text'
                                maxLength='70'
                                onChange={text => setCity(text.target.value)}
                                placeholder='please enter between 2 and 70 characters'
                                value={city}
                            />
                        </div>

                        <div className='createGroupPartOneDiv'>
                            <label className='createGrouppartonelabel'>County</label>
                            <input
                                className='createGroupPartOneInput'
                                id='cgpoinputtwo'
                                type='text'
                                maxLength='70'
                                onChange={text => setCounty(text.target.value)}
                                placeholder='please enter between 2 and 70 characters'
                                value={county}
                            />
                        </div>

                        <div className='createGroupPartOneDiv'>
                            <label className='createGrouppartonelabel'>State</label>
                            <input
                                className='createGroupPartOneInput'
                                type='text'
                                id='cgpoinputthree'
                                maxLength='2'
                                onChange={text => setState(text.target.value)}
                                value={state}
                                placeholder='enter the proper state abbreviation'
                            />
                        </div>

                        <div className='createGroupPartOneDiv'>
                            <label className='createGrouppartonelabel'>Postal / Zip Code</label>
                            <input
                                className='createGroupPartOneInput'
                                type='text'
                                id='cgpoinputthree'
                                maxLength='10'
                                onChange={text => setPostalCode(text.target.value)}
                                value={postalCode}
                                placeholder='enter the proper state abbreviation'
                            />
                        </div>

                        <div className='createGroupPartOneButtons'>
                            <button className='return' style={{ visibility: 'hidden' }}></button>
                            <button
  className="creategrouppartonesubmit"
  disabled={city.length < 3 || (!USstates.includes(state.toUpperCase()))}
  onClick={e => {
    setPart('Part Two');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  Next
</button>

                        </div>
                    </div>
                )
            }

            {
                part === 'Part Two' && (
                    <div classname='createGroupPartTwo'>
                        <div classname='createGroupPartTwoFlavorText'>
                            <h1 id='cfptwoheader'>Enter the name and purpose of this organization</h1>
                            <p className='cftwoParagraph'>  The purpose section can be described as a short (less than 70 characters) description.  Similar to tags that can be put on youtube videos this enables people to search via specific criteria. You can elaborate in the about section later on when it comes to specific details. </p>
                            <p className='cftwoParagraph'>The name is best left as is.  This enables the viewer to be able to do further research via a simple google search.  If it is a specific branch of a larger group feel free to simply add the city at the end.  For example, Furfill of Toms River.</p>

                        </div>
                        <div id='sectionparttwocreategroup'>
                            <div classname='createGroupPartTwoDiv'>
                                <label className='createGrouppartonelabel'>Organization's name</label>
                                <input
                                    className='createGroupPartOneInput'
                                    id='cgparttwoname'
                                    type='text'
                                    onChange={text => setName(text.target.value)}
                                    placeholder='please enter between 2 and 30 characters'
                                    value={name}
                                    maxLength='30'
                                />
                            </div>
                            <div classname='createGroupPartTwoDiv'>
                                <label className='createGrouppartonelabel'>Organization's purpose</label>
                                <input
                                    className='createGroupPartOneInput'
                                    id='cgparttwopurpose'
                                    type='text'
                                    onChange={text => setPurpose(text.target.value)}
                                    placeholder='please enter between 2 and 70 characters'
                                    value={purpose}
                                    maxLength='70'
                                />
                            </div>
                        </div>
                        <div className='createGroupPartOneButtons'>
                        <button
  className="creategrouppartonesubmit"
  onClick={e => {
    setPart('Part One');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  Back
</button>

                            <button
  className="creategrouppartonesubmit"
  disabled={purpose.length < 2 || purpose.length > 70 || name.length > 30 || name.length < 2}
  onClick={e => {
    setPart('Part Three');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  Next
</button>

                        </div>
                    </div>
                )
            }

            {
                part === 'Part Three' && (
                    <div>

                        <div classname='createGroupPartTwoFlavorText'>
                            <h1 id='cfptwoheader'>You now have 2000 characters to describe this organization</h1>
                            <p className='cgfThreeParagraph'>  It is best to be as detailed as possible.  Describe their location, what they provide, contact info, and anything else that you determine necessary.  Please feel free to describe the quality of services as well.  This is not to be degenerative but to offer a realistic portrayal of what they provide.  We just ask to be kind when doing so they are human beings who are trying to make the world a better place.</p>
                            <p className='cgfThreeParagraph'>We also request that you mark if they require an appointment or some sort of process to begin services.  This is available via the dropdown form near the submit button. If there is any discriminatory barriers, for example, immigration documentation, proof of address, background / credit checks, etc please list it in the about section.  This is common for organizations that receive government funding.</p>
                            <p className='cgfThreeParagraph'>If you realize you made a mistake do not worry you can update the lisitng at any time.</p>
                        </div>
                        <div>
                            <div className='partthreecreategroupabout'>
                                <label id='labelaboutcgf3'>Describe The Group Below</label>
                                <span className="text14 textcolor-grey">Character count: {about.length}</span>
                                <span className="text14 textcolor-grey">Character count: {2000 - about.length} remaining</span>
                                <textarea
                                    rows='14'
                                    cols='100'
                                    type='text'
                                    maxLength='2000'
                                    onChange={text => setAbout(text.target.value)}
                                    value={about}
                                />
                            </div>



                            <div className="createGroupLastPartButtons">

                                <select className='cgfselect' name='type' value={privatee} onChange={e => setPrivatee(e.target.value)} >
                                    <option >Are Barriers Present</option>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes </option>
                                </select>

                                <button
  className="creategrouppartonesubmit"
  onClick={e => {
    setPart('Part Two');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  Back
</button>
                                <button className="creategrouppartoneconfirm" disabled={about.length < 2 || about.length > 2000 || privatee === 'Are Barriers Present' || privatee === ''} type="submit">{'Add Listing!'}</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </form>

    );
}

export default CreateGroupForm