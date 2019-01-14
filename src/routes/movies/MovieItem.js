import { h } from 'preact';
import { getMoviePoster } from '../../services/tmdb';
import style from './style';

const MovieItem = ({ movie, children }) => (<div class={style.movieItem}>
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
	{children}
</div>);

export default MovieItem;