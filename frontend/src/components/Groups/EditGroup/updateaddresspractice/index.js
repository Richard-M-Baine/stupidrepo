import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// thunks
import { getOneLocationThunk, editLocationThunk } from '../../../../store/locations.js';

import './updateAddress.css';

function UpdateAddressForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useSelector((state) => state?.locations);
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [statee, setStatee] = useState('');
    const [country, setCountry] = useState('us')
    const [postalCode, setPostalCode] = useState('')
    const [loaded, setIsLoaded] = useState(false);
 

    useEffect(() => {
        dispatch(getOneLocationThunk(id)).then(() => setIsLoaded(true));
    }, [dispatch, id]);

    // Update form fields when location data is available
    useEffect(() => {
        if (location[id]) {
            setAddress(location[id].address || '');
            setCity(location[id].city || '');
            setCounty(location[id].county || '');
            setStatee(location[id].state || '');
            setPostalCode(location[id].postalCode || '');
        }
    }, [location, id]);

    const USstates = [
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
        'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    const submit = async (e) => {
        e.preventDefault();

        const payload = { address, city, county, state: statee, country, postalCode };
        dispatch(editLocationThunk(payload, id));

        navigate(`/mylistings`);
    };

    return loaded && (
        <div className='editGroupMainDiv'>
            <div className='editGroupTextBox'>
                <h1>Welcome, feel free to update your group's address</h1>
                <h3>To aid in searching, please enter <a href='https://www.faa.gov/air_traffic/publications/atpubs/cnt_html/appendix_a.html'>the appropriate state abbreviation.</a></h3>
            </div>

            <form className='editGroupForm' onSubmit={submit}>
                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>Address</label>
                    <input
                        type='text'
                        value={address}
                        className='editgroupinput'
                        onChange={e => setAddress(e.target.value)}
                        required
                        maxLength='70'
                    />
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>City</label>
                    <input
                        type='text'
                        value={city}
                        className='editgroupinput'
                        onChange={e => setCity(e.target.value)}
                        required
                        maxLength='70'
                    />
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>County</label>
                    <input
                        type='text'
                        value={county}
                        className='editgroupinput'
                        onChange={e => setCounty(e.target.value)}
                        required
                        maxLength='70'
                    />
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>State</label>
                    <input
                        type='text'
                        value={statee}
                        maxLength='2'
                        className='editLocationStateinput'
                        onChange={e => setStatee(e.target.value)}
                        required
                    />
                </div>

                <div className='editGroupEditDiv'>
                    <label className='editGroupLabel'>Postal / Zip Code</label>
                    <input
                        type='text'
                        value={postalCode}
                        maxLength='10'
                        className='editLocationStateinput'
                        onChange={e => setPostalCode(e.target.value)}
                        required
                    />
                </div>

                <button 
                    className='editgroupsubmitbutton' 
                    disabled={address.length > 70 || address.length < 2 
                        || city.length < 2 || city.length > 70 || !USstates.includes(statee.toUpperCase())}
                    type="submit">
                    Update The Listing
                </button>
            </form>
        </div>
    );
}

export default UpdateAddressForm;
