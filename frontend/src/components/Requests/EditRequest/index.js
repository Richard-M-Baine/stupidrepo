import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';


// thunks
import { getOneRequestThunk } from '../../../store/requests.js'
import { editRequestThunk } from '../../../store/requests.js';

import './editRequest.css'


function EditRequestForm() {
    const navigate = useNavigate()
    const { id } = useParams()

    const request = useSelector((state) => state?.requests)
    const sessionUser = useSelector((state) => state?.session?.user)
    const dispatch = useDispatch();

    const [address, setAddress] = useState(request[id]?.address)
    const [city, setCity] = useState(request[id]?.city)
    const [details, setDetails] = useState(request[id]?.details)
    const [endTime, setEndTime] = useState(request[id]?.endTime)
    const [startTime, setStartTime] = useState(request[id]?.startTime)
    const [statee, setStatee] = useState(request[id]?.state)
    const [title, setTitle] = useState(request[id]?.title)
    const [loaded, setIsLoaded] = useState(false)
    const [part, setPart] = useState('Part One')
    const [newSTime, setNewSTime] = useState('')
    const [newETime, setNewETime] = useState('')

   
    let date = start_time?.slice(5, 7)
    let day = start_time?.slice(0, 3)
    let month = start_time?.slice(8, 11)
    let year = start_time?.slice(12, 16)
    let hour = start_time?.slice(17, 19)
    let minute = start_time?.slice(20, 22)
    let zeit
    if (hour > 12) {
        zeit = `${hour - 12}:${minute} PM`
    }
    else {
        zeit = `${hour}:${minute} AM`
    }


    let endDate = end_time?.slice(5, 7)
    let endDay = end_time?.slice(0, 3)
    let endMonth = end_time?.slice(8, 11)
    let endYear = end_time?.slice(12, 16)
    let endHour = end_time?.slice(17, 19)
    let endMinute = end_time?.slice(20, 22)
    let endZeit
    if (endHour > 12) {
        endZeit = `${endHour - 12}:${endMinute} PM`
    }
    else {
        endZeit = `${endHour}:${endMinute} AM`
    }




    useEffect(() => {

        dispatch(getOneRequestThunk(id)).then(() => setIsLoaded(true))

        if (loaded){
            setAddress(request[id]?.address)
            setCity(request[id]?.city)
            setDetails(request[id]?.details)
            setEndTime(request[id]?.end_time)
            setStartTime(request[id]?.start_time)
            setStatee(request[id]?.state)
            setTitle(request[id]?.title)

        }
    }, [dispatch, loaded])

    if (!sessionUser) {

        history.push('/login')
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

  
    function monthConverter(month) {
        if (month === 'Jan') return '01'
        if (month === 'Feb') return '02'
        if (month === 'Mar') return '03'
        if (month === 'Apr') return '04'
        if (month === 'May') return '05'
        if (month === 'Jun') return '06'
        if (month === 'Jul') return '07'
        if (month === 'Aug') return '08'
        if (month === 'Sep') return '09'
        if (month === 'Oct') return '10'
        if (month === 'Nov') return '11'
        if (month === 'Dec') return '12'
    }


    const submit = async e => {
        e.preventDefault()
        let blah
        let endBlah
        if (!newSTime) {
            let mo = monthConverter(month)
            blah = `${year}-${mo}-${date}T${hour}:${minute}`
        }
        if (newSTime) {
            blah = newSTime
        }
        if (!newETime) {
            let Endmo = monthConverter(endMonth)
            endBlah = `${endYear}-${Endmo}-${endDate}T${endHour}:${endMinute}`
        }
        if (newETime) {
            endBlah = newETime
        }


        const payload = {
            title: title,
            start_time: blah,
            end_time: endBlah,
            details: details,
            address: address,
            city: city,
            state: statee,

        }


        await dispatch(editRequestThunk(payload, id))

        navigate('/mylistings')

    }

    function timeDecider(a, b) {

        let yearStart = Number(a.slice(0, 4))
        let yearEnd = Number(b.slice(0, 4))
        console.log(yearStart, yearEnd)
        let monthStart = Number(a.slice(5, 7))
    
        let monthEnd = Number(b.slice(5, 7))
    
        let dayStart = Number(a.slice(8, 10))
        let dayEnd = Number(b.slice(8, 10))
    
        let hourStart = Number(a.slice(11, 13))
        let hourEnd = Number(b.slice(11, 13))
    
        let minuteStart = Number(a.slice(14, 16))
        let minuteEnd = Number(b.slice(14, 16))
    
        if (yearStart < yearEnd) {
    
            return true
        } else if (yearStart > yearEnd) {
    
            return false
        } else {
            console.log('ontomonths')
            if (monthStart < monthEnd) {
                return true
            } else if (monthStart > monthEnd) {
                return false
            } else {
                console.log('ontodays')
                if (dayStart < dayEnd) {
                    return true
                } else if (dayStart > dayEnd) {
                    return false
                } else {
                    console.log('ontohours')
                    if (hourStart < hourEnd) {
                        return true
                    } else if (hourStart > hourEnd) {
                        return false
                    } else {
                        console.log('ontominutes')
                        if (minuteStart < minuteEnd) {
                            return true
                        } else {
                            return false
                        }
                    }       
                        
                    
    
    
                }
            }
        }
    }

    function converter(item){
        let itemDate = item?.slice(5, 7)
        let itemDay = item?.slice(0, 3)
        let itemMonth = item?.slice(8, 11)
        let itemYear = item?.slice(12, 16)
        let itemHour = item?.slice(17, 19)
        let itemMinute = item?.slice(20, 22)
        let itemMo = monthConverter(itemMonth)
        return  `${itemYear}-${itemMo}-${itemDate}T${itemHour}:${itemMinute}`   
    }
    let first
    let second

    if (!newSTime){
        first = converter(startTime)
    } else{
        first = newSTime
    }

    if (!newETime){
        second = converter(endTime)
    }else {
        second = newETime
    }

    console.log(first, second)

    let validator = timeDecider(first,second)
    console.log(validator)


   
    
   
   



    return loaded && (
        <div >
            <div className='partrequestEditDiv'>
                <h1>Feel free to alter your request as you see fit</h1>
                <h2>{part} of Two</h2>
            </div>

            <form className='formrequestEdit' onSubmit={submit}>

                {
                    part === 'Part One' && (
                        <div className='requestEditDivPartOne'>
                            <div className='editGroupEditDiv'>
                                <label className='editGroupLabel'>address</label>
                                <input
                                    type='text'
                                    value={address}
                                    maxLength='30'
                                    className='editgroupinput'
                                    onChange={e => setAddress(e.target.value)}
                                    required
                                    id='editgroupnameinput'
                                />
                            </div>

                            <div className='editGroupEditDiv'>
                                <label className='editGroupLabel'>City</label>
                                <input
                                    type='text'
                                    maxLength='30'
                                    value={city}
                                    className='editgroupinput'
                                    onChange={e => setCity(e.target.value)}
                                    required
                                    id='editgroupnameinput'
                                />
                            </div>

                            <div className='editGroupEditDiv'>
                                <label className='editGroupLabel'>State</label>
                                <input
                                    type='text'
                                    value={statee}
                                    maxLength='2'
                                    className='editgroupinput'
                                    onChange={e => setStatee(e.target.value)}
                                    required
                                    id='editgroupnameinput'
                                />
                            </div>

                            <div className='editGroupEditDiv'>
                                <label className='editGroupLabel'>Title</label>
                                <input
                                    type='text'
                                    value={title}
                                    className='editgroupinput'
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    maxLength='40'
                                    id='editgroupnameinput'
                                />
                            </div>

                            <div className='editGroupEditDiv'>
                                <label className='editGroupLabel'>details</label>
                                <textarea
                                    rows='20'
                                    cols='100'
                                    type='text'
                                    maxLength='2000'
                                    value={details}
                                    onChange={e => setDetails(e.target.value)}
                                    required
                                    id='editgroupabouttextarea'
                                />
                            </div>

                            <button className='editgroupsubmitbutton' disabled={address?.length < 1 || address?.length > 30 || city?.length < 3 || city?.length > 30 || !USstates?.includes(statee?.toUpperCase()) || title?.length < 1 || title?.length > 70 || details?.length < 1} onClick={e => setPart('Part Two')}>Go to next part - times</button>
                        </div>
                    )
                }

                {
                    part === 'Part Two' && (
                        <>
                            <div className='requestedittimedivout'>
                                <div className='editRequestTimeDiv'>
                                    
                                    <h3 id='startTimeeditRequest'>Alter your current start time of  {day} {date} {month} {year} at {zeit}</h3>
                                    <h4>Leave blank if it is fine</h4>
                                    <input
                                        className='editrequesttimeboxthing'


                                        type="datetime-local"
                                        min={"2022-12-05T08:00"}
                                        max={"9999-12-31T00:00"}
                                        defaultValue={newSTime}
                                        onChange={e => setNewSTime(e.target.value)}
                                    />

                                </div>

                                <div className='editRequestTimeDiv'>

                                    <h3>Alter your current stop time of  {endDay} {endDate} {endMonth} {endYear} at {endZeit}</h3>
                                    <h4 id='thisistheedittimeenddivemakewider'>Leave blank if it is fine.  The submit button will be disabled if you try to go back in time.</h4>
                                    <input
                                        className='editrequesttimeboxthing'


                                        type="datetime-local"
                                        min={"2022-12-05T08:00"}
                                        max={"9999-12-31T00:00"}
                                        value={newETime}
                                        onChange={e => setNewETime(e.target.value)}
                                    />

                                </div>
                            </div>


                            <div className='editRequestFormButtons'>
                            <button className='editrequestsubmitbutton' onClick={e => setPart('Part One')}>Go to part one</button>
                            <button className='editrequestsubmitbutton' type="submit" disabled={validator === false} >Update Your Request</button>
                            </div>
                        </>)}
            </form>
        </div>


    )
}

export default EditRequestForm