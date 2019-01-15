/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import style from './style';
import MovieItem from './MovieItem';

const MoviesSuggestionsList = ({ selectedGenre, movies, voteMovie }) => (<div class={style.moviesList}>
	<button onClick={this.openSuggestions} class={style.openSuggestionsButton}>Προτείνετε ταινία για την Κυριακή!</button>
	<div>
		{movies.map(movie => (<MovieItem selectedGenre={selectedGenre.id} movie={movie}>
			<div class={style.voters}>
				{movie.voters.map(voter => <img class={style.voter} src={voter} />)}
			</div>
			<button class={style.btn} onClick={() => voteMovie(movie.id)}>Ψηφίστε</button>
		</MovieItem>))}
	</div>
</div>);

export default MoviesSuggestionsList;