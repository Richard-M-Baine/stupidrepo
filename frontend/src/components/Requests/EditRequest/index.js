import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// thunks
import { getOneRequestThunk, editRequestThunk } from '../../../store/requests';

import './editRequest.css';

function EditRequestForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const request = useSelector((state) => state?.requests?.[id]);
    const sessionUser = useSelector((state) => state?.session?.user);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [details, setDetails] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [statee, setStatee] = useState('');
    const [title, setTitle] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [newSTime, setNewSTime] = useState('');
    const [newETime, setNewETime] = useState('');

    useEffect(() => {
        dispatch(getOneRequestThunk(id)).then(() => setLoaded(true));
    }, [dispatch, id]);

    useEffect(() => {
        if (loaded && request) {
            setAddress(request.address || '');
            setCity(request.city || '');
            setDetails(request.details || '');
            setEndTime(request.endTime || '');
            setStartTime(request.startTime || '');
            setStatee(request.state || '');
            setTitle(request.title || '');
        }
    }, [loaded, request]);

    useEffect(() => {
        if (!sessionUser) {
            navigate('/login');
        }
    }, [sessionUser, navigate]);

    const monthConverter = (month) => {
        const months = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return months[month] || '01';
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm format
    };

    const submit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            start_time: newSTime || formatDateTime(startTime),
            end_time: newETime || formatDateTime(endTime),
            details,
            address,
            city,
            state: statee,
        };

        await dispatch(editRequestThunk(payload, id));
        navigate('/mylistings');
    };

    return loaded && (
        <div>
            <div className="partrequestEditDiv">
                <h1>Edit Your Request</h1>
            </div>

            <form className="formrequestEdit" onSubmit={submit}>
                <div className="requestEditDivPartOne">
                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">Address</label>
                        <input
                            type="text"
                            value={address}
                            maxLength="30"
                            className="editgroupinput"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">City</label>
                        <input
                            type="text"
                            value={city}
                            className="editgroupinput"
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">State</label>
                        <select value={statee} onChange={(e) => setStatee(e.target.value)} required>
                            {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
                                .map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">Start Time</label>
                        <input
                            type="datetime-local"
                            value={newSTime || formatDateTime(startTime)}
                            className="editgroupinput"
                            onChange={(e) => setNewSTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">End Time</label>
                        <input
                            type="datetime-local"
                            value={newETime || formatDateTime(endTime)}
                            className="editgroupinput"
                            onChange={(e) => setNewETime(e.target.value)}
                            required
                        />
                    </div>

                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">Details</label>
                        <textarea
                            value={details}
                            className="editgroupinput"
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>

                    <div className="editGroupEditDiv">
                        <label className="editGroupLabel">Title</label>
                        <input
                            type="text"
                            value={title}
                            className="editgroupinput"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="editRequestSubmit">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditRequestForm;
