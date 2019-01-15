import { h } from 'preact';
import { getMoviePoster } from '../../services/tmdb';
import style from './style';

const MovieItem = ({ movie, children, selectedGenre }) => (<div class={style.movieItem + ' ' + movie.genre_ids.find(g => g === selectedGenre) === null ? style.opaque : ''}>
	<div class={style.movieItemInfo}>
		<div class={style.movieItemStart}>
			<img src={getMoviePoster(movie.poster_path)} />
			<div>IMDB: {movie.vote_average}</div>
		</div>
		<div class={style.movieItemCenter}>
			<h4>{movie.title}</h4>
			<p>{movie.release_date}</p>
			<div>{movie.overview}</div>
		</div>
	</div>
	{movie.genre_ids.find(g => g === selectedGenre) === null ? null : children}
</div>);

export default MovieItem;