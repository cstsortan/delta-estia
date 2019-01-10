import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => (
	<header class={style.header}>
		<h1>Ανομολόγητα</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Αρχική</Link>
			<Link activeClassName={style.actiev} href="/new-post">
				<FontAwesomeIcon icon="plus-circle" />
			</Link>
		</nav>
	</header>
);

export default Header;
