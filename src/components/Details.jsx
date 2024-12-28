import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function Details() {
	const { newUser, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logout()
			navigate('/login')
			console.log('You are now logged out')
		} catch (e) {
			console.log(e.message)
		}
	}
	
useEffect(() => {
    if (newUser) {
        console.log("User in Details.jsx:", newUser);
    }
}, [newUser]);
	return (
		<>
			<div className='form-container'>
				<div className="details">
					<h2>User Details</h2>
                    <p>Name: {newUser.displayName}</p>
                    <p>Email: {newUser.email}</p>
                    <p>account creation time: {newUser.metadata.creationTime}</p>
                    <p>last sign in time: {newUser.metadate.lastSignInTime}</p>
					<p>database provider: {newUser.providerId}</p>
					<p>user photo url: {newUser.reloadUserInfo.photoUrl}</p>
					<p>sign in provider: {newUser.reloadUserInfo.providerUserInfo[0].providerId}</p>
				</div>
				<button onClick={handleLogout} className='logout-btn'>Logout</button>
			</div>
		</>
	)
}

export default Details