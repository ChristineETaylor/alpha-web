import {actionTypes} from "../actions/userProfileActions";

const initialState = {
	loading: false, user: null, error: null, blog: {count: 0, posts: []},
	follower: {count: 0, accounts: []}, following: {count: 0, accounts: []}
};

export const userProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_USER_INFO:
			// TODO: Serve from cache while loading
			return {...state, loading: true, user: null};

		case actionTypes.LOADED_USER_INFO:
			return {...state, loading: false, user: action.result};

		case actionTypes.LOAD_USER_INFO_FAILED:
			return {...state, loading: false, error: action.reason};

		case actionTypes.RESET_USER_INFO:
			return initialState;

		case actionTypes.FOLLOW_COUNT_DONE:
			return {
				...state, follower: {...state.follower, count: action.result.follower_count},
				following: {...state.following, count: action.result.following_count}
			};

		case actionTypes.USER_BLOG_LOADED:
			return {...state, blog: {count: action.results.length, posts: action.results}};

		case actionTypes.USER_BLOG_LOAD_FAILED:
			return {...state, error: action.reason};

		default:
			return state;
	}
};
