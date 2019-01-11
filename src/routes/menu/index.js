import { h } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from './MenuItem';

const Menu = ({ onMenuClosed }) => (<div class={style.menuRoot}>
	<div class={style.topContainer}>
		<FontAwesomeIcon onClick={onMenuClosed} size="2x" icon="times-circle" />
	</div>
	<div class={style.menuItems}>
		<MenuItem text="Πλυντήρια" experimental comingSoon />
	</div>
</div>);

export default Menu;