import { h, Component } from 'preact';
import style from './style';
import firebase from 'firebase/app';
import linkState from 'linkstate';
import { route } from 'preact-router';

class NewPost extends Component {
	state = {
		text: '',
		floor: 0,
		imageUrl: '',
		color: 'default'
	}
	onImageChange(event) {
		if (!event.target.files[0]) return;
		const ref = firebase.storage().ref('photos')
			.child(`photo_${Date.now()}`);
		ref.put(event.target.files[0]).then(res => ref.getDownloadURL()).then(imageUrl => this.setState({ imageUrl }));
	}
	onSubmitted() {
		if (!this.state.text === '' || !this.imageUrl === '') return;
		firebase.firestore().collection('posts')
			.add({
				text: this.state.text,
				floor: this.state.floor,
				imageUrl: this.state.imageUrl,
				color: this.state.color,
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
			});
		this.setState({
			text: '',
			floor: 0,
			imageUrl: ''
		});
		route('/', true);
	}
	onFloorSelected = (e) => {
		this.setState({
			floor: parseInt(e.target.value, 10)
		});
	}

	constructor() {
		super();
		this.onImageChange = this.onImageChange.bind(this);
		this.onSubmitted = this.onSubmitted.bind(this);
	}
	render() {
		return (
			<div class={style.newPostRoot}>
				<div class={style.floorRoot}>
					<label value={this.state.floor} class={style.floorLabel} for="floor">Όροφος</label>
					<select onInput={this.onFloorSelected} id="floor" class={style.newPostFloor}>
						<option value={0}>3os</option>
						<option value={1}>4os</option>
						<option value={2}>5os</option>
						<option value={3}>6os</option>
						<option value={4}>7os</option>
						<option value={5}>8os</option>
						<option value={6}>9os</option>
						<option value={7}>10os</option>
					</select>
					<label class={style.floorLabel}>Color</label>
					<select value={this.state.color} class={style.newPostFloor} onInput={linkState(this, 'color')}>
						<option value="default">Χρώμα</option>
						<option value="red">Κόκκινο</option>
						<option value="blue">Μπλέ</option>
						<option value="green">Πράσινο</option>
						<option value="purple">Μωβ</option>
						<option value="pink">Ροζ</option>
					</select>
				</div>
				<textarea onInput={linkState(this, 'text')} placeholder="Πες κάτι που δε ξέρει κανείς..." class={style.newPostText +' '+ style[`color-${this.state.color}`]}>
					{this.state.text}
				</textarea>
				<input onChange={this.onImageChange} class={style.newPostFileInput} type="file" />
				<div class={style.newPostPhotoInput}>
					{this.state.imageUrl === '' ? null : <img class={style.newPostPhoto} src={this.state.imageUrl} />}
				</div>
				<button onClick={this.onSubmitted} class={style.newPostSubmitButton}>Αποστολή</button>
			</div>
		);
	}
}

export default NewPost;
