import React from 'react';
import { useEffect, useContext } from 'react';
import {useState} from 'react';
import { UserContext } from './../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                        'Content-type': 'application/json',
                        authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h3>You Have: {bookings.length} Bookings</h3>
            {
                bookings.map( (book) => <li>{book.name} you are booking from {(new Date(book.checkIn)).toDateString('dd/MM/yyyy')} to {(new Date(book.checkOut)).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;