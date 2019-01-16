import { h } from 'preact';
import style from './style';

const MovieSearchForm = ({ movieText, onMovieTextChanged }) => (<div class={style.moviesForm}>
	<button onClick={this.closeSuggestions}>Πίσω</button>
	<input
		value={movieText}
		onInput={onMovieTextChanged}
		class={style.movieInput}
		placeholder="Τίτλος ταινίας"
	/>
	<button onClick={this.searchMovies} class={style.movieButton}>Αναζήτηση</button>
</div>);

export default MovieSearchForm;