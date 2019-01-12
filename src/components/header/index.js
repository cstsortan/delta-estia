import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ onMenuItemOpened }) => (
	<header class={style.header}>
		<div onClick={onMenuItemOpened} class={style.menuIcon}>
			<FontAwesomeIcon icon="bars" color="white" />
		</div>
		<h1>Δ Εστία</h1>
		<div class={style.space} />
		<nav>
			<Link activeClassName={style.active} href="/chat">
				<FontAwesomeIcon color="white" icon="envelope" />
			</Link>
			<Link activeClassName={style.active} href="/">Ανομολόγητα</Link>
			<Link activeClassName={style.active} href="/new-post">
				<FontAwesomeIcon icon="plus-circle" />
			</Link>
		</nav>
	</header>
);

export default Header;
