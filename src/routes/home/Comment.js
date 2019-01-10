import { h } from 'preact';
import style from './commentStyle';

const Comment = ({ comment }) => (<div class={style.commentRoot}>
	<div class={style.commentAuthor}>
		<img class={style.commentAuthorPhoto} src={comment.photoUrl} />
		<div class={style.commentAuthorName}>{comment.authorName}</div>
	</div>
	<p class={style.commenText}>{comment.text}</p>
</div>);

export default Comment;