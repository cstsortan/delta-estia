import { Component, h } from 'preact';
import style from './commentsListStyle';
import firebase from 'firebase/app';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line react/prefer-stateless-function
export default class CommentsList extends Component {
	
	showComments() {
		firebase.firestore().collection('posts')
			.doc(this.props.postId)
			.collection('comments')
			.orderBy('timestamp', 'desc')
			.onSnapshot(snap => {
				this.setState({
					comments: snap.docs.map(doc => ({
						...doc.data(),
						id: doc.id
					})),
					showComments: true
				});
			});
	}
	constructor() {
		super();
		this.state = {
			comments: [],
			showComments: true
		};
		this.showComments = this.showComments.bind(this);
	}
	componentDidMount() {
		this.showComments();
	}
	render() {
		return (this.state.showComments ? <div class={style.commentsList}>
			{this.state.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
		</div> : <div onClick={this.showComments} class={style.showComments}>
			<div class={style.showCommentsIcon}>Show comments</div>
			<FontAwesomeIcon icon="chevron-circle-down" />
		</div>);
	}
	
}
