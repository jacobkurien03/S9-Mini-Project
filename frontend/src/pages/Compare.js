import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ButtonGroup,
	ListGroup,
	Button,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import { addItem, removeItem } from '../actions/cartActions';

const Wishlist = ({ match, location, history }) => {
	const [totalItems, setTotalItems] = useState(0);
	const productID = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1; // fetch from the query string
	const dispatch = useDispatch();

	// get cart, userInfo and userdetails from redux store
	const cart = useSelector((state) => state.cart);
	// const { cartItems } = cart;
	const cartItems = 0;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	// get user details depending on what type of login it is, dispatch with correspnding argument
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// store total items to local state
	useEffect(() => {
		if (cartItems) {
			setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
		}
	}, [cartItems]);

	// if userdetails shows error, then use refresh token to get new access tokens
	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	// add item to cart
	useEffect(() => {
		if (productID) {
			dispatch(addItem(productID, qty));
		}
	}, [dispatch, productID, qty]);

	// remove item from cart
	const handleRemoveFromCart = (id) => {
		dispatch(removeItem(id));
	};

	// proceed to shipping address page, which is the next step in placing an order
	const handleCheckout = (e) => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Meta title='My Cart | Amazing' />
			<Col md={8}>
				<h1>Compare.</h1>
					<Message>
						Your Compare is empty. <Link to='/'>Go Back.</Link>{' '}
					</Message>
			</Col>
			<Col md={4} className='mt-3'>
				<ListGroup>
                    
				</ListGroup>
			</Col>
		</Row>
	);
};

export default Wishlist;
