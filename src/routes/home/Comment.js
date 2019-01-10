import { h } from 'preact';
import style from './commentStyle';
// import { EmojioneV4 } from 'react-emoji-render';

const Comment = ({ comment }) => {
	let emojisList = null;
	if (comment.emojis) {
		emojisList = <div class={style.emojis}>{comment.emojis.map(emoji => <span>{emoji}</span>)}</div>;
	}
	return (<div class={style.commentRoot}>
		<div class={style.commentAuthor}>
			<img class={style.commentAuthorPhoto} src={comment.photoUrl} />
			<div class={style.commentAuthorName}>{comment.authorName}</div>
		</div>
		{comment.text ? <p class={style.commentText}>{comment.text}</p> : emojisList}
	</div>);
};

export default Comment;