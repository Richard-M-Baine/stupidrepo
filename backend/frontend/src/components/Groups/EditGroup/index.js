import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate} from 'react-router-dom';
// end import test

// thunks
import { getOneGroupThunk } from '../../../store/groups';
import { editGroupThunk } from '../../../store/groups';

import './editGroupForm.css'


function EditCharityForm() {
    
    const navigate = useNavigate()
    const { id } = useParams()
    const groupId = Number(id);

    const group = useSelector((state) => state?.group);



    const dispatch = useDispatch();




    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [purpose, setPurpose] = useState("");
    const [privatee, setPrivatee] = useState(false);
    const [loaded, setIsLoaded] = useState(false)



    useEffect(() => {
        dispatch(getOneGroupThunk(groupId)).then(() => setIsLoaded(true));
    }, [dispatch, groupId]);
    
    useEffect(() => {
        if (loaded && group && group[groupId]) {
            setName(group[groupId]?.name || "");
            setAbout(group[groupId]?.about || "");
            setPurpose(group[groupId]?.purpose || "");
            setPrivatee(group[groupId]?.private || false);
        }
    }, [loaded, group, groupId]);

  

    const submit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            about,
            purpose,
            private: privatee

        };

        await dispatch(editGroupThunk(payload, id))

        navigate(`/mylistings`)
    }






    return loaded && (
        <div className='editGroupMainDiv'>
            <div className='editGroupTextBox'>
                <h1>Welcome feel free to alter the listing as you see fit</h1>

            </div>
            <form className='editGroupForm' onSubmit={submit}>
                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>Name</label>
                    <input
                        type='text'
                        value={name}
                        className='editgroupinput'
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength='30'
                        id='editgroupnameinput'
                    />
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>About</label>
                    <textarea
                        rows='20'
                        cols='100'
                        type='text'
                        maxLength='2000'
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                        required
                        id='editgroupabouttextarea'
                    />

                </div>
                <div>
                    <span className="editGroupSpans">Character count: {about?.length}</span>
                    <span className="editGroupSpans">characters remaining {2000 - about?.length} </span>
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>Purpose</label>
                    <input
                        type='text'
                        className='editgroupinput'
                        id='editgrouppurposeinput'
                        maxLength='70'
                        value={purpose}
                        onChange={e => setPurpose(e.target.value)}
                        required
                    />
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>Barriers?</label>
                    <select className='editGroupselect' name='type' value={privatee} onChange={e => setPrivatee(e.target.value)} >
                        <option >Are barriers Present?</option>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </div>
                <button className='editgroupsubmitbutton' type="submit" disabled={about?.length < 2 || about?.length > 2000 || privatee === 'Are Barriers Present' || name?.length < 2 || name?.length > 30 || purpose?.length < 2 || purpose?.length > 70}>Update The Listing</button>
            </form>
        </div>
    )
}

export default EditCharityForm