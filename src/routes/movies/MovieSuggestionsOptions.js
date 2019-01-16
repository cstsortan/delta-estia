import { h } from 'preact';
import style from './style';

const MovieSuggestionsOptions = ({ discover }) => (<div class={style.searchOptions}>
	<div class={!discover && style.searchOptionActive} onClick={this.selectSearch}>Search</div>
	<div class={discover && style.searchOptionActive} onClick={this.selectDiscover}>Discover</div>
</div>);

export default MovieSuggestionsOptions;