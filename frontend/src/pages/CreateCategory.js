import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listCategoryDetails, updateCategory } from '../actions/productActions';
import { CATEGORY_UPDATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { refreshLogin, getUserDetails } from '../actions/userActions';

import FormContainer from '../components/FormContainer';

import axios from 'axios'

const CreateCategory = ({ match, history }) => {
	// all variable for stroing product details
	const categoryId = match.params.id;
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();
	const validName = /^[a-zA-Z ]*$/;

	const [nameError, setNameError] = useState(false);	
	const [brandError, setBrandError] = useState(false);	

	const fullNameError = document.querySelector(".fullname .error");
	const brandNameError = document.querySelector(".brandName .error");

	const validateName = () => {
		if (validName.test(name)) {
		  setNameError(false);
		} else if (name == "") {
		  fullNameError.innerText = "Field cannot be blank";
		  setNameError(true);
		} else {
		  fullNameError.innerText = "Name should not contain numbers";
		  setNameError(true);
		}
	  };
	const validateBrand = () => {
		if (validName.test(description)) {
			setBrandError(false);
		} else if (description == "") {
			brandNameError.innerText = "Field cannot be blank";
			setBrandError(true);
		} else {
			brandNameError.innerText = "Description should not contain numbers";
			setBrandError(true);
		}
	  };

	const categoryDetails = useSelector((state) => state.categoryDetails);
	const { loading, category, error } = categoryDetails;

	const categoryUpdate = useSelector((state) => state.categoryUpdate);
	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = categoryUpdate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	// fetch user login details
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// fetch new access tokens if user details fail, using the refresh token
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		dispatch(listCategoryDetails(categoryId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// update the product details in state
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: CATEGORY_UPDATE_RESET });
			history.push('/admin/categorylist');
		} else {
			if (!category || category._id !== categoryId) {
				dispatch(listCategoryDetails(categoryId));
			} else {
				setName(category.name);
				setDescription(category.description);
			}
		}
	}, [category, dispatch, categoryId, history, successUpdate]);

	// submit the category details
	const handleSubmit = async (e) => {
		if (
			nameError == false &&
			brandError == false
		  ){
			let data = {
				name:name,
				description:description
			}
			let response = await axios.post(
			  `https://infinite-stream-23131.herokuapp.com/api/products/createcategory`,data
			);
            history.push('/admin/categorylist');
		  }
	};

	return (
		<>
			<Link to='/admin/categorylist'>
				<Button variant='outline-primary' className='mt-3'>
					Go Back
				</Button>
			</Link>
			<FormContainer style={{ marginTop: '-2em' }}>
				<h1>Create category</h1>
				{loadingUpdate ? (
					<Loader />
				) : errorUpdate ? (
					<Message dismissible variant='danger' duration={10}>
						{errorUpdate}
					</Message>
				) : (
					<>
						{loading ? (
							<Loader />
						) : (
							<Form onSubmit={handleSubmit}>
								{/* {error && (
									<Message
										dismissible
										variant='danger'
										duration={10}>
										{error}
									</Message>
								)} */}
								<Form.Group controlId='name'>
									<FloatingLabel
										controlId='nameinput'
										label='Name'
										className='fullname mb-3'>
										<Form.Control
											size='lg'
											placeholder='Enter Name'
											type='text'
											onChange={(e) =>
												setName(e.target.value)
											}
											onKeyUp={() => validateName()}
											required
										/>
										<div
                  className={
                    nameError ? "error error-visible " : "error error-hidden"
                  }
                ></div><br/>
									</FloatingLabel>
								</Form.Group>
								<Form.Group controlId='description'>
									<FloatingLabel
										controlId='descinput'
										label='Description'
										className='brandName mb-3'>
										<Form.Control
											size='lg'
											placeholder='Enter description URL'
											type='text'
											onChange={(e) =>
												setDescription(e.target.value)
											}
											onKeyUp={() => validateBrand()}
											required
										/>
										<div
                  className={
                    brandError ? "error error-visible " : "error error-hidden"
                  }
                ></div><br/>
									</FloatingLabel>
								</Form.Group>
								<div className='d-flex'>
									<Button
										type='submit'
										className='my-1 ms-auto'>
										Create category
									</Button>
								</div>
							</Form>
						)}
					</>
				)}
			</FormContainer>
		</>
	);
};

export default CreateCategory;
