import style from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ experimental = false, comingSoon = false, text }) => (<div class={style.menuItem}>
	<div>{text}</div>
	<div class={style.status}>Status: -/6</div>
	<div class={style.tags}>
		{experimental ? <div class={style.experimentalTag}>
			<span>experimental</span>
			<FontAwesomeIcon icon="flask" />
		</div> : null}
		{comingSoon ? <div class={style.comingSoonTag}>
			<span>Coming Soon</span>
		</div> : null}
	</div>
</div>);

export default MenuItem;