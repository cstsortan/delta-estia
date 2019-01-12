import { h, Component } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from './MenuItem';
import { Link } from 'preact-router/match';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { docData } from 'rxfire/firestore';

export default class Menu extends Component {
	openWashers = () => {
		this.props.onMenuClosed();
	}
	state = {
		washersCount: 0
	};
	componentDidMount = () => {
		this._unsub = docData(firebase.firestore().doc('status/washers'))
			.subscribe(washerStatus => this.setState({ washersCount: washerStatus.count }));
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
							experimental
							washerStatus={washersCount}
							text="Πλυντήρια"
						/>
					</Link>
				</div>
			</div>);
	}
}