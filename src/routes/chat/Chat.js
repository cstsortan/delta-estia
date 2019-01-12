import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendMessage, getChats } from '../../services/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import Comment from '../home/Comment';

export default class Chat extends Component {
	sendMessage = () => {
		if (this.state.text.trim() === '') return;
		let user = firebase.auth().currentUser;
		if (!user) {
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
				.then(credential => {
					user = credential.user;
					if (!user) return;
					sendMessage({
						userUid: user.uid,
						photoUrl: user.photoURL,
						timestamp: firebase.firestore.FieldValue.serverTimestamp(),
						text: this.state.text,
						authorName: user.displayName
					});
					this.setState({
						text: ''
					});
				});
		}
		else {
			sendMessage({
				userUid: user.uid,
				photoUrl: user.photoURL,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				text: this.state.text,
				authorName: user.displayName
			});
			this.setState({
				text: ''
			});
		}
	};
	
	state = {
		messages: [],
		text: ''
	};

	componentDidMount () {
	  this._messagesSub = getChats(firebase.database()).subscribe(messages => {
			this.setState({ messages });
		});
	}
	
	componentDidUpdate(props, prevState) {
		if (prevState.messages === this.state.messages) return;
		this.list.scrollTop = this.list.scrollHeight + 156;
	}
	
	componentWillUnmount() {
		this._messagesSub.unsubscribe();
	}
	

	render({}, { messages }) {
		return (<div class={style.chatRoot}>
			<div ref={list => this.list = list} class={style.messagesList}>
				{messages.map(message => <Comment key={message.id} comment={message} />)}
			</div>
			<div class={style.messageForm}>
				<input
					value={this.state.text}
					onInput={linkState(this, 'text')}
					class={style.messageInput}
					type="text"
					placeholder="Γράψτε ένα μήνυμα"
				/>
				<FontAwesomeIcon onClick={this.sendMessage}
					size="2x"
					color="purple"
					icon="arrow-alt-circle-right"
				/>
			</div>
		</div>);
	}
}