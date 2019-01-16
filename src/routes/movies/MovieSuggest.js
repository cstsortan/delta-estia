import { h } from 'preact';
import style from './style';
import MoviesSuggestionsList from './MoviesSuggestionsList';
import MoviesSearchResults from './MoviesSearchResults';
import MovieSearchForm from './MoviesSearchForm';
import MovieSuggestionsOptions from './MovieSuggestionsOptions';
const MovieSuggest = ({ isSuggesting, discover, movieText, onMovieTextChanged, movieResults, selectedGenre, movies }) => (isSuggesting
	?
	<div ref={results => this.resultsRef = results} class={style.suggestions}>
		<MovieSuggestionsOptions discover={discover} />
		{!discover ? <MovieSearchForm movieText={movieText} onMovieTextChanged={onMovieTextChanged} /> : null}
		<MoviesSearchResults movieResults={movieResults} selectedGenre={selectedGenre} suggest={this.suggest} />
	</div>
	: <MoviesSuggestionsList movies={movies} selectedGenre={selectedGenre} voteMovie={this.voteMovie} />);

export default MovieSuggest;