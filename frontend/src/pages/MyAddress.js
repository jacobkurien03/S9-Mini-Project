import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutStatus from '../components/CheckoutStatus';
import { saveShippingAddress } from '../actions/cartActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import axios from 'axios';
import "../styles/error.css";

const MyAddress = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	// fetch user details from the redux store
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// update access token to a new ine using the refresh tokens
	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	// save shipping address and move to payment screen
	const handleSubmit = async (e) => {
		e.preventDefault();
		let data = {
            userId:userInfo.id,
            address:address,
			city:city,
			postalCode:postalCode,
			country:country
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };
        let response = await axios.post(
          `/api/users/addAddress`,data,config
        );
        if(response.status == 200){
            history.push('/myAddress')
        }
	};

	return (
		<FormContainer>
			{/* <CheckoutStatus step1 step2 /> */}
			<h1>Add Address</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='address'>
					<FloatingLabel
						controlId='addressinput'
						label='Address'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter address'
							type='text'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group controlId='city'>
					<FloatingLabel
						controlId='cityinput'
						label='City'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter City'
							type='text'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<FloatingLabel
						controlId='postalcodeinput'
						label='Postal Code'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter Postal Code'
							type='text'
							value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group controlId='country'>
					<FloatingLabel
						controlId='countryinput'
						label='Country'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter Country'
							type='text'
							value={country}
							required
							onChange={(e) => setCountry(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<div className='d-flex'>
					<Button
						type='submit'
						className='ms-auto'
						style={{
							padding: '0.5em 1em',
							width: '8rem',
						}}>
						Save Address
					</Button>
				</div>
			</Form>
		</FormContainer>
	);
};

export default MyAddress;
