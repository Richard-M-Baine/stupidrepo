import { NavLink, useNavigate} from 'react-router-dom';
import React from 'react'
import { useDispatch} from 'react-redux'

import { deleteGroupThunk } from '../../../../store/groups.js'

import './groupCard.css'


function MyCharityCard({ group }) {



    const navigate = useNavigate()
    const dispatch = useDispatch()


    const editGroup = e => {
        e.preventDefault()
        navigate(`/groups/edit/${group?.id}`)
    }
    const updateAddress = e => {
        e.preventDefault()
        navigate(`/groups/editAddress/${group?.id}`)
    }

    const destroyGroup = e => {
        e.preventDefault()
        dispatch(deleteGroupThunk(group?.id)).then(() => navigate('/mylistings'))
    }

    function formatUpdatedAt(updatedAt) {
        const date = new Date(updatedAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
    
        return { year, month, day };
    }

    const updatedDate = formatUpdatedAt(group.updatedAt)

   



    return (
        <div>
            <NavLink className='navGroupAllgroupcard' to={`/groups/${group?.id}`}>
                <div className='groupcardhometext'>
                    <h2 className='homegroupcardname'>name - {group?.name}</h2>
                    <p className='homegroupcardpurpose'>purpose - {group?.purpose}</p>
                    <p className='homegroupcardpurpose'>Last Updated {updatedDate.day}, {updatedDate.month} {updatedDate.year}</p>
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