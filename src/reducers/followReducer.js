import _ from 'lodash';

import {actionTypes} from '../actions/followActions';

const initialState = {};
/**
 * {
 *   uname1: {
 *     followers: {
 *       count: 10,
 *       results: {uname2: true, ...}
 *     },
 *     following: {
 *       count: 123,
 *       results: {uname3: true, ...}
 *     }
 *   },
 *   ...
 * }
 */

export const followReducer = (state = initialState, action) => {

	let newState = _.clone(state)
	let following, follower;
	switch (action.type) {

		case actionTypes.FOLLOWER_LOAD_DONE:
		case actionTypes.FOLLOWING_LOAD_DONE:

			action.results.map(result => {
				follower = result.follower;
				following = result.following;
				!newState[follower] && (newState[follower] = {});
				!newState[following] && (newState[following] = {});

				!newState[following].followers && (newState[following].followers = {
					results: {},
					count: 0
				})
				!newState[follower].following && (newState[follower].following = {
					results: {},
					count: 0
				})

				newState[follower].following.results[following] = true;
				newState[follower].following.count = Object.keys(newState[follower].following.results[following]).length;
				newState[following].followers.results[follower] = true;
				newState[following].followers.count = Object.keys(newState[following].followers.results[follower]).length;
				return result;
			})
			return newState;

		case actionTypes.FOLLOW_INIT:
			following = action.username;
			follower = localStorage.getItem('username');
			!newState[follower] && (newState[follower] = {});
			!newState[following] && (newState[following] = {});

			!newState[following].followers && (newState[following].followers = {
				results: {},
				count: 0
			})
			!newState[follower].following && (newState[follower].following = {
				results: {},
				count: 0
			})
			newState[follower].following.results[following] = true;
			newState[follower].following.count = Object.keys(newState[follower].following.results[following]).length;
			newState[following].followers.results[follower] = true;
			newState[following].followers.count = Object.keys(newState[following].followers.results[follower]).length;
			return newState;


		case actionTypes.UNFOLLOW_INIT:
			following = action.username;
			follower = localStorage.getItem('username');
			!newState[follower] && (newState[follower] = {});
			!newState[following] && (newState[following] = {});

			!newState[following].followers && (newState[following].followers = {
				results: [],
				count: 0
			})
			!newState[follower].following && (newState[follower].following = {
				results: [],
				count: 0
			})
			delete newState[follower].following.results[following]
			newState[follower].following.count = newState[follower].following.results[following] ?
				Object.keys(newState[follower].following.results[following]).length : 0;
			delete newState[following].followers.results[follower];
			newState[following].followers.count = newState[following].followers.results[follower] ?
				Object.keys(newState[following].followers.results[follower]).length : 0;
			return newState;

			// TODO: Handle error case.. (remove from following/unfollowing)

		default:
			return state;
	}

};