import { h, Component } from 'preact';
import style from './style';
import Washer from './washer';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { collectionData } from 'rxfire/firestore';

const washersCol = firebase.firestore().collection('washers');

export default class Washers extends Component {
	state = {
		washers: []
	};

	componentDidMount() {
		this._sub = collectionData(washersCol.orderBy('washerName'), 'id')
			.subscribe(washers => this.setState({ washers }));
	}

	componentWillUnmount() {
		this._sub.unsubscribe();
	}
	
	render({}, { washers }) {
		return (
			<div class={style.washersRoot}>
				{washers.map(washer => <Washer key={washer.id} washer={washer} />)}
			</div>);
	}
}