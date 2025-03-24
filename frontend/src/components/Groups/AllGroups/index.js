import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CharityCard from './GroupCard/index.js'
import './allGroups.css'



import { fetchAllGroupsThunk } from '../../../store/groups.js'
import MapStuff from '../../maps/GroupMap/index.js'


function AllCharities() {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.groups)



    const groupsList = Object.values(groups)






    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchAllGroupsThunk())
            .then(() => setLoaded(true))
    }, [dispatch])


    return loaded && (
        <div className='mainAllGroups'>

            <div className='groupAllPart'>
                <div className='groupAllTextDiv'>
                    <h1>Nearby Organizations</h1>
                </div>

                <div className='secondaryGroupAllDiv'>


                    <div className='groupsAllPart'>
                        {groupsList.map(group => (
                            <CharityCard group={group} key={group.id} />
                        ))}
                    </div>
                    <div className='mapContainerMain'><MapStuff /></div>
                </div>
            </div>
        </div>
    )

}

export default AllCharities;