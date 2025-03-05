import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

// thunk imports
import { createRequestThunk } from '../../../store/requests.js'

import './createRequest.css'

function CreateRequestForm() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)

    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [details, setDetails] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [part, setPart] = useState('Part One')


    if (!sessionUser) {
        navigate('/')
    }

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

        const payload = {
            title: title,
            start_time: startDate,
            end_time: endDate,
            details: details,
            address: address,
            city: city,
            state: state,

        }


        await dispatch(createRequestThunk(payload))

        navigate('/mylistings')

    }

    let current = new Date();
let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
let cTime = current.getHours() + ":" + current.getMinutes()
let CurrentdateTime = cDate + 'T' + cTime;


    return (
        <form className='createRequestForm' onSubmit={submit}>
            <h2 className='createRequestPartDiv'>
                {part} of Three
            </h2>

            {
                part === 'Part One' && (
                    <div className='createGroupPartOne'>

                        <div className='createGroupPartOneFlavorText'>
                            <h1 id='cfponeheader'>Enter an address or area where you need help</h1>
                            <p className='cfponeParagraph'>This does not have to be a legal address.  For example a nearest street corner or even a geogrpahical area (south east Tom's River) are perfectly fine. If you don't feel comfortable listing your address this is also recommended. You can always update the form, later on, or send the address via message once someone offers help.</p>
                            <p className='cfponeParagraph'>For requests that require transportation we suggest that the pickup location be the address of choice.  You can explain where you need to go in the about section later on. Also for safety purposes we request any minors be in the accompaniment of a legal guardian.  To help with searching please enter <a target="_blank" className='stateabbreviationlink' href='https://www.faa.gov/air_traffic/publications/atpubs/cnt_html/appendix_a.html'>the appropriate state abbreviation.</a></p>
                        </div>
                        <div className='createGroupPartOneDiv'>
                            <label className='createGrouppartonelabel'>Address</label>
                            <input
                                className='createGroupPartOneInput'
                                id='cgpoinputone'
                                type='text'
                                maxLength='30'
                                placeholder='please enter between 2 and 30 characters'
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
                                maxLength='30'
                                onChange={text => setCity(text.target.value)}
                                placeholder='please enter between 2 and 30 characters'
                                value={city}
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

                        <div className='createGroupPartOneButtons'>
                            <button className='return' style={{ visibility: 'hidden' }}></button>
                            <button id='partOneCreaterequest' className="creategrouppartonesubmit" disabled={city.length < 3 || (!USstates.includes(state.toUpperCase()))} onClick={e => setPart('Part Two')}>Next</button>
                        </div>
                    </div>
                )
            }

            {
                part === 'Part Two' && (
                    <div>
                        <div>
                            <p className='crfPartTwoParagraph'>We recommend that you err on the side of caution and instead of saying you need half an hour say your doctors appointment will take 45 minutes.  This keeps the person from running late themselves.  Other ideas would be if possible arrange transportation for half the trip.  That way instead of being an hour tops all you are requesting for is 15 minutes.  </p>
                            <p className='crfPartTwoParagraph'>Make sure that your end time is not "behind" your start time.  The next button will be disabled if you attempt this.  You can't go back in time!  </p>
                        </div>
                        <div className='timeCreateRequestDiv'>
                            <div className='createRequestStartTimeDiv'>

                                <h3>When will you need help?</h3>
                                <input
                                    className='ceselectEvent'
                                    required
                                    name="event-start-date"
                                    type="datetime-local"
                                    min={"2022-12-05T00:00"}
                                    max={"9999-12-31T00:00"}
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />

                            </div>
                            <div className='createRequestEndTimeDiv'>

                                <h3>When will you stop needing help?</h3>
                                <input
                                    className='ceselectEvent'
                                    required
                                    name="event-end-date"
                                    type="datetime-local"
                                    value={endDate}
                                    min={"2022-12-05T00:00"}
                                    max={"9999-12-31T00:00"}
                                    onChange={e => setEndDate(e.target.value)} />

                            </div>
                        </div>

                        <div className='createRequestpartTwoButtons'>
                            <button className='createRequestpartTwosubmit' onClick={e => setPart('Part One')}>Go Back</button>
                            <button className="createRequestpartTwosubmit" disabled={!startDate || !endDate || endDate < startDate} onClick={e => setPart('Part Three')}>Next</button>
                        </div>
                    </div>

                )
            }
            {
                part === 'Part Three' && (
                    <div>
                        <div>
                          

                            <p className= 'crfPartTwoParagraph'>Make your title short and sweet.  As can be seen it is what people in your community see first.  Our recommendation is to keep it simple and positive.  In your description you have 2000 characters to describe any details that might be pertinent.  If you need groceries explain what groceries or where you wish to shop.  If your timing is flexible also mention that (flexibility is generally a good marker of getting someone to accept your request). Now that we think of that put it in the title as well!  It is always possible to avoid devulging everything, ie your address, until someone accepts your request and you can message them.  Any other concerns feel free to mention as well.   </p>
                        </div>

                        <div className='partThreeRequestTitleDiv'>
                            <label className='createRequestpartThreelabel'>Title</label>
                            <input
                                className='createGroupPartOneInput'
                                id='cgparttwoname'
                                type='text'
                                onChange={text => setTitle(text.target.value)}
                                placeholder='please enter between 2 and 40 characters'
                                value={title}
                                maxLength='40' />
                        </div>

                        <div>
                            <div className='partthreecreategroupabout'>
                                <label id='labelaboutcgf3'>Enter any details here </label>
                                <span className="text14 textcolor-grey">Character count: {details.length}</span>
                                <span className="text14 textcolor-grey">Character count: {2000 - details.length} remaining</span>
                                <textarea
                                    rows='14'
                                    cols='100'
                                    type='text'
                                    placeholder='please enter between 1 and 2000 characters'
                                    maxLength='2000'
                                    onChange={text => setDetails(text.target.value)}
                                    value={details}
                                />
                            </div>
                        </div>

                        <div className="createRequestLastPartButtons">
                            <button className="creategrouppartonesubmit" onClick={e => setPart('Part Two')}>Back</button>
                            <button className="createRequestppartoneconfirm" disabled={title.length < 2 || details.length > 2000 || details.length < 1} type="submit">{'Submit Request!'}</button>
                        </div>

                    </div>
                )


            }
        </form>
    )
}

export default CreateRequestForm