import { h, Component } from 'preact';
import style from './style';
// import firebase from 'firebase/app';
import Post from './post';
// import PreactVirtualList from 'preact-virtual-list';
import { BehaviorSubject } from 'rxjs';
import { getPosts } from '../../services/firebase';

class Home extends Component {
	state = {
		posts: [],
		limit: 10
	};
	pagination$ = new BehaviorSubject(10);

	showMore = () => {
		this.state.limit += 10;
		this.pagination$.next(this.state.limit);
	}

	constructor() {
		super();
		this.renderPost = this.renderPost.bind(this);
	}


	componentDidMount() {
		this.unsub = getPosts(this.pagination$).subscribe(posts => this.setState({ posts }));
	}

	componentWillUnmount() {
		this.unsub.unsubscribe();
	}

	renderPost(post) {
		return <Post key={post.id} post={post} />;
	}

	render() {
		return (
			<div class={style.home}>
				{this.state.posts.length === 0 ? <p>Loading huge secrets...</p> : null}
				{this.state.posts.map(post => <Post key={post.id} post={post} />)}
				{/* <PreactVirtualList data={this.state.posts} rowHeight={340} renderRow={this.renderPost} /> */}
				{this.state.posts.length === 0 ? null :<button onClick={this.showMore} class={style.showMoreButton}>Show more...</button>}
			</div>
		);
	}
}

export default Home;
