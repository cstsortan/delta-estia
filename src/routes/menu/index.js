import { h } from 'preact';
import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu = ({ onMenuClosed }) => (<div class={style.menuRoot}>
	<div class={style.topContainer}>
		<FontAwesomeIcon onClick={onMenuClosed} size="2x" icon="times-circle" />
	</div>
	<div class={style.menuItems}>
		<div class={style.menuItem}>Πλυντήρια</div>
	</div>
</div>);

export default Menu;