/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import style from './style';

const GenreSuggest = ({ allGenres, onGenreVoted, genreVoters }) => (<div>
	<div class={style.textCenter}>Παρακαλώ επιλέξτε είδος</div>
	{allGenres.map(genre => (<div class={style.genre} onClick={() => onGenreVoted(genre.id)} key={genre.id}>
		<h4 class={style.genreName}>{genre.name}</h4>
		<div class={style.voters}>{genreVoters[genre.id] ?
			genreVoters[genre.id]
				.map(voterImage =>
					<img class={style.voter} key={voterImage} src={voterImage} />) : null}</div>
	</div>))}
</div>);

export default GenreSuggest;