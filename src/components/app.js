import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import NewPost from '../routes/new-post';
import EmojiPicker from '../routes/emoji-picker';
import Menu from '../routes/menu';
import Washers from '../routes/washers';
import Chat from '../routes/chat/Chat';
import Movies from '../routes/movies';

export default class App extends Component {

	state = {
		menuOpen: false
	};
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	onMenuItemOpened = () => {
		this.setState({
			menuOpen: true
		});
	};

	onMenuClosed = () => {
		this.setState({
			menuOpen: false
		});
	};

	render({}, { menuOpen }) {
		if (menuOpen) {
			return <Menu onMenuClosed={this.onMenuClosed} />;
		}
		return (
			<div id="app">
				<Header onMenuItemOpened={this.onMenuItemOpened} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<NewPost path="/new-post/" />
					<EmojiPicker path="/emoji-picker/:postId" />
					<Washers path="/washers/" />
					<Chat path="/chat/" />
					<Movies path="/movies" />
				</Router>
			</div>
		);
	}
}
