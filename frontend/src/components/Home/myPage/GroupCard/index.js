import { NavLink, useNavigate} from 'react-router-dom';
import React from 'react'
import { useDispatch} from 'react-redux'

import { deleteGroupThunk } from '../../../store/groups.js'

import './groupCard.css'


function MyCharityCard({ group }) {



    const navigate = useNavigate()
    const dispatch = useDispatch()


    const editGroup = e => {
        e.preventDefault()
        navigate.push(`/groups/edit/${group?.id}`)
    }
    const updateAddress = e => {
        e.preventDefault()
        navigate.push(`/groups/editAddress/${group?.id}`)
    }

    const destroyGroup = e => {
        e.preventDefault()
        dispatch(deleteGroupThunk(group?.id)).then(() => navigate.push('/mylistings'))
    }

    let date = group?.updated_at.slice(5,7)
    let day = group?.updated_at.slice(0,3)
    let month = group?.updated_at.slice(8,11)
    let year = group?.updated_at.slice(12,16)



    return (
        <div>
            <NavLink className='navGroupAllgroupcard' to={`/groups/${group?.id}`}>
                <div className='groupcardhometext'>
                    <h2 className='homegroupcardname'>{group?.name}</h2>
                    <p className='homegroupcardpurpose'>{group?.purpose}</p>
                    <p className='homegroupcardpurpose'>Last Updated {day} {date} {month} {year}</p>
                </div>
            </ NavLink>
            <div className='buttondivgroupcard'>
                <button className='groupcardbutton' onClick={editGroup}>Edit details</button>
                <button className='groupcardbutton' onClick={destroyGroup}>Remove listing</button>
                <button className='groupcardbutton' onClick={updateAddress}>Update Address</button>
            </div>
        </div>

    )
}


export default MyCharityCard