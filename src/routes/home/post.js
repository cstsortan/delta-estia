import { Component, h } from 'preact';
import CommentsList from './CommentsList';
import style from './postStyles';
import firebase from 'firebase/app';
import linkState from 'linkstate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { route } from 'preact-router';

export default class Post extends Component {
	addEmojis = () => {
		let user = firebase.auth().currentUser;
		if (!user) {
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
				.then(cred => {
					if (!cred) return;
					route(`/emoji-picker/${this.props.post.id}`, true);
				});
			return;
		}
		route(`/emoji-picker/${this.props.post.id}`, true);
	}
	postComment() {
		if (this.state.text.trim() !== '') return;
		let user = firebase.auth().currentUser;
		if (!user) {
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
				.then(credential => {
					user = credential.user;
					if (!user) return;
					firebase.firestore().collection('posts')
						.doc(this.props.post.id)
						.collection('comments')
						.add({
							text: this.state.text,
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							authorName: user.displayName,
							photoUrl: user.photoURL,
							userUid: user.uid
						});
					this.setState({
						text: ''
					});
				});
		}
	 else {
			firebase.firestore().collection('posts')
				.doc(this.props.post.id)
				.collection('comments')
				.add({
					text: this.state.text,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					authorName: user.displayName,
					photoUrl: user.photoURL,
					userUid: user.uid
				});
			this.setState({
				text: ''
			});
		}
		
	}

	constructor() {
		super();
		this.postComment = this.postComment.bind(this);
		this.state = {
			authenticated: false,
			text: ''
		};
	}
	render({ post }) {
		return (
			<div class={style.postRoot}>
				<p class={style.postText +' '+ style[`color-${post.color}`]}>{post.text}</p>
				<img class={style.postImage} src={post.imageUrl} />
				<div class={style.postFloor}>
					{post.floor === -3 ? 'Ισόγειο' : `${post.floor+3}ος Όροφος`}
				</div>
				<div class={style.commentsForm}>
					<FontAwesomeIcon onClick={this.addEmojis} size="lg" color="orange" icon="kiss-wink-heart" class={style.commentsSubmitButton} />
					<input
						value={this.state.text}
						onInput={linkState(this, 'text')}
						class={style.commentsInput}
						type="text"
						placeholder="Σχολιάστε"
					/>
					<FontAwesomeIcon onClick={this.postComment} size="lg" color="purple" icon="arrow-alt-circle-right" class={style.commentsSubmitButton} />
				</div>

				<CommentsList postId={post.id} />
			</div>
		);
	}
}