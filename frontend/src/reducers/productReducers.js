import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILURE,
	PRODUCT_DETAILS_FAILURE,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DELETE_FAILURE,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAILURE,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_RESET,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAILURE,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_RESET,
	CATEGORY_DETAILS_FAILURE,
	CATEGORY_DETAILS_REQUEST,
	CATEGORY_DETAILS_SUCCESS,
	CATEGORY_LIST_FAILURE,
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_DELETE_FAILURE,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_CREATE_REQUEST,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_CREATE_FAILURE,
	CATEGORY_UPDATE_REQUEST,
	CATEGORY_UPDATE_SUCCESS,
	CATEGORY_UPDATE_FAILURE,
	CATEGORY_UPDATE_RESET,
	CATEGORY_CREATE_RESET,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILURE,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_TOP_RATED_SUCCESS,
	PRODUCT_TOP_RATED_FAILURE,
	PRODUCT_TOP_RATED_REQUEST,
} from '../constants/productConstants';

// list products based on keyword and paginated page number
export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };

		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				page: action.payload.page,
				pages: action.payload.pages,
			};

		case PRODUCT_LIST_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return { state };
	}
};

// details about a particular product
export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case PRODUCT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_DELETE_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_CREATE_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return { ...state };
	}
};

export const productCreateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_CREATE_REVIEW_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return { ...state };
	}
};

export const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case PRODUCT_UPDATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_UPDATE_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_UPDATE_RESET:
			return { product: {} };
		default:
			return { ...state };
	}
};

// fetching top rated products
export const productTopRatedReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_TOP_RATED_REQUEST:
			return { loading: true, products: [] };
		case PRODUCT_TOP_RATED_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_TOP_RATED_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

// list products based on keyword and paginated page number
export const categoryListReducer = (state = { categorys: [] }, action) => {
	switch (action.type) {
		case CATEGORY_LIST_REQUEST:
			return { loading: true, categorys: [] };

		case CATEGORY_LIST_SUCCESS:
			return {
				loading: false,
				categorys: action.payload.categorys,
				page: action.payload.page,
				pages: action.payload.pages,
			};

		case CATEGORY_LIST_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return { state };
	}
};

// details about a particular product
export const categoryDetailsReducer = (
	state = { category: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case CATEGORY_DETAILS_REQUEST:
			return { loading: true, ...state };
		case CATEGORY_DETAILS_SUCCESS:
			return { loading: false, category: action.payload };
		case CATEGORY_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

export const categoryDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CATEGORY_DELETE_REQUEST:
			return { loading: true };
		case CATEGORY_DELETE_SUCCESS:
			return { loading: false, success: true };
		case CATEGORY_DELETE_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return { ...state };
	}
};

export const categoryCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CATEGORY_CREATE_REQUEST:
			return { loading: true };
		case CATEGORY_CREATE_SUCCESS:
			return { loading: false, success: true, category: action.payload };
		case CATEGORY_CREATE_FAILURE:
			return { loading: false, error: action.payload };
		case CATEGORY_CREATE_RESET:
			return {};
		default:
			return { ...state };
	}
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
	switch (action.type) {
		case CATEGORY_UPDATE_REQUEST:
			return { loading: true };
		case CATEGORY_UPDATE_SUCCESS:
			return { loading: false, success: true, category: action.payload };
		case CATEGORY_UPDATE_FAILURE:
			return { loading: false, error: action.payload };
		case CATEGORY_UPDATE_RESET:
			return { category: {} };
		default:
			return { ...state };
	}
};
