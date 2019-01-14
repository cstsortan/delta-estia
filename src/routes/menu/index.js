import { h, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from './MenuItem';
import { Link } from 'preact-router/match';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import { docData } from 'rxfire/firestore';
import { getWashersStatus } from '../../services/firebase';

export default class Menu extends Component {
	openWashers = () => {
		this.props.onMenuClosed();
	}
	state = {
		washersCount: 0
	};
	componentDidMount = () => {
		this._unsub = getWashersStatus() //docData(firebase.firestore().doc('status/washers'))
			.subscribe(washerStatus => {
				console.log(washerStatus);
				this.setState({ washersCount: washerStatus });
			});
	}

	componentWillUnmount() {
		this._unsub.unsubscribe();
	}
	
	render({ onMenuClosed }, { washersCount }) {
		return (
			<div class={style.menuRoot}>
				<div class={style.topContainer}>
					<FontAwesomeIcon onClick={onMenuClosed} size="2x" icon="times-circle" />
				</div>
				<div class={style.menuItems}>
					<Link href="/washers" class={style.link}>
						<MenuItem onMenuItemClicked={this.openWashers}
							text="Πλυντήρια"
						><div class={style.status}>Status: {washersCount ? washersCount : '-'}/6</div>
						</MenuItem>
					</Link>
					<Link href="/movies" class={style.link}>
						<MenuItem onMenuItemClicked={this.openWashers} text="Movies" experimental />
					</Link>
				</div>
			</div>);
	}
}