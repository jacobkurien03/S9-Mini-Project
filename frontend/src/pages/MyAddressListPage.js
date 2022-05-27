import React, { useState,useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	listProducts,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import axios from 'axios'

const ProductListPage = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, products, error, pages, page } = productList;
    const [address, setAddress] = useState('');

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	// fetch user login info
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// refresh token for expired access tokens
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		if (successCreate)
			history.push(`/admin/product/${createdProduct._id}/edit`);
		else dispatch(listProducts('', pageNumber, 10)); // 3rd parameter is the no of products to be listed per page
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	// delete product after confirming
	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you wanna delete this Address?')){
            let data = {
                addressId:id
            }
            let response = await axios.post(
                `https://infinite-stream-23131.herokuapp.com/api/users/deleteAddress`,data
              );
              if (response.status === 200) {
                getAddress()
              }
              else{
                alert(response.message)
              }
        }
	};
	// create a new dummy product
	const handleCreateProduct = () => {
		history.push('/createAddress')
	};
    let data = {
        userId:userInfo.id
    }

    async function getAddress() {
        console.log(userInfo.id)
        let response = await axios.post(
          "https://infinite-stream-23131.herokuapp.com/api/users/showAddress",data
        );
        if (response.status === 200) {
          setAddress(response.data.message);
        }
      }
      useEffect(() => {
        getAddress();
      }, []);
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>My Address</h1>
				</Col>
				<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						className='my-3'
						style={{
							padding: '0.5em 1em',
						}}
						onClick={handleCreateProduct}>
						<i className='fas fa-plus' /> Create New Address
					</Button>
				</Col>
			</Row>
			{errorDelete && (
				<Message dismissible variant='danger' duration={10}>
					{errorDelete}
				</Message>
			)}
			{errorCreate && (
				<Message dismissible variant='danger' duration={10}>
					{errorCreate}
				</Message>
			)}
			{loading || loadingCreate || loadingDelete ? (
				<Loader />
			) : error ? (
				<Message dismissible variant='danger' duration={10}>
					{error}
				</Message>
			) : (
				<>
					<Table
						striped
						bordered
						responsive
						className='table-sm text-center'>
						<thead>
							<tr>
								<th>Address</th>
								<th>City</th>
								<th>PostalCode</th>
								<th>Country</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody>
							{address &&
								address.map((addres) => {
									return (
										<tr key={addres.address}>
											<td>{addres.address}</td>
											<td>{addres.city}</td>
											<td>{addres.postalCode}</td>
											<td>{addres.country}</td>

											<td
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'space-around',
												}}>
												<LinkContainer
													to={`/updateAddress/${addres._id}`}>
													<Button
														variant='link'
														className='btn-sm'>
														<i className='fas fa-edit' />
													</Button>
												</LinkContainer>
												<Button
													className='btn-sm'
													onClick={() =>
														handleDelete(
															addres._id
														)
													}
													variant='danger'>
													<i
														style={{
															fontSize: '0.9em',
															padding: '0',
														}}
														className='fas fa-trash'
													/>
												</Button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListPage;
