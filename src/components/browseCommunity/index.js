import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

import Sidebar from '../sidebar';
import Post from '../post';
import {loadFeedsByCreated, loadFeedsByHot, loadFeedsByTrending} from "../../actions/userFeedActions";
import {loadUserAccounts} from "../../actions/allUserActions";
import feedStyles from '../feed/styles.scss';
import CommunitySortFilter from '../communitySortFilter';

class BrowseCommunity extends React.Component {
	constructor(props) {
		super(props);
		this.loadFeeds(props);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.match.params.filter !== this.props.match.params.filter) {
			this.loadFeeds(newProps);
		}
		let usersRequired = newProps.userFeed[this.props.match.params.filter].posts
			.map(i => newProps.allPosts[i].author).filter(username => !_.some(Object.keys(newProps.allUsers), j => username === j));
		usersRequired.length && newProps.loadUserAccounts(usersRequired);
	}

	loadFeeds(props) {
		let filter = this.props.match.params.filter;
		let community = this.props.match.params.community;
		switch (filter) {
			case 'hot':
				props.loadFeedsByHot(community);
				break;
			case 'trending':
				props.loadFeedsByTrending(community);
				break;
			case 'created':
				props.loadFeedsByCreated(community);
				break;
			default:
			// No problem
		}
	}

	render() {
		return <div className={['uk-container'].join(' ')}>
			<div uk-grid="true">
				<div className={feedStyles.sidebarContainer}>
					<Sidebar/>
				</div>
				<div className={['uk-margin-top', feedStyles.feedPosts].join(' ')}>
					<div className={[].join(' ')}>
						<CommunitySortFilter/>
						<div>
							{this.props.userFeed[this.props.match.params.filter].posts && this.props.userFeed[this.props.match.params.filter].posts.map(post =>
								<Post key={post} postPermlink={post}/>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userFeed: state.userFeed,
		allUsers: state.allUsers.users,
		allPosts: state.allPosts.posts
	}
};

export default withRouter(connect(mapStateToProps, {
	loadFeedsByHot, loadFeedsByCreated, loadFeedsByTrending,
	loadUserAccounts
})(BrowseCommunity));
