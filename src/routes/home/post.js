import { Component, h } from 'preact';
import CommentsList from './CommentsList';
import style from './postStyles';
import firebase from 'firebase/app';
import linkState from 'linkstate';

// eslint-disable-next-line react/prefer-stateless-function
export default class Post extends Component {
	postComment() {
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
					{post.floor + 3}ος Οροφος
				</div>
				<div class={style.commentsForm}>
					<input value={this.state.text} onInput={linkState(this, 'text')} class={style.commentsInput} type="text" placeholder="Σχολιάστε" />
					<button onClick={this.postComment} class={style.commentsSubmitButton}>Αποστολή</button>
				</div>
				<CommentsList postId={post.id} />
			</div>
		);
	}
}