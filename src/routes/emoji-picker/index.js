import { Component, h } from 'preact';
import EmojiPicker from 'emoji-picker-react';
import style from './style';
import { EmojioneV4 } from 'react-emoji-render';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { route } from 'preact-router';
import firebase from 'firebase/app';

export default class EmojiPage extends Component {
	onCancel = () => {
		route('/', true);
	};

	onErase = () => {
		this.setState({
			emojis: []
		});
	};

	onSend = () => {
		route('/', true);
		const user = firebase.auth().currentUser;
		firebase.firestore()
			.collection('posts')
			.doc(this.props.postId)
			.collection('comments')
			.add({
				authorName: user.displayName,
				userUid: user.uid,
				photoUrl: user.photoURL,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				emojis: this.state.emojis
			});
		route('/', true);
	};

	onEmojiClick = (emoji) => {
		if (this.state.emojis.length === 6) return;
		this.setState(prev => ({ emojis: [...prev.emojis, String.fromCodePoint(parseInt(emoji, 16))] }));
	};
	
	state = {
		emojis: []
	};
	
	render({ postId }) {
		return (<div class={style.home}>
			<div class={style.emojiList}>
				{this.state.emojis.map(emoji => <EmojioneV4 class={style.emoji} text={emoji} />)}
			</div>
			<EmojiPicker onEmojiClick={this.onEmojiClick} />
			<div class={style.emojiControls}>
				<FontAwesomeIcon onClick={this.onCancel} color="red" size="2x" icon="times-circle" />
				<FontAwesomeIcon onClick={this.onErase} color="purple" size="2x" icon="eraser" />
				<FontAwesomeIcon onClick={this.onSend} color="blue" size="2x" icon="arrow-alt-circle-right" />
			</div>
		</div>);
	}
}