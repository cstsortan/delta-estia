/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import style from './style';

import ReactPaginate from 'react-paginate';
import MovieItem from './MovieItem';

const MoviesSearchResults = ({ movieResults, selectedGenre, suggest }) => movieResults ? <div class={style.results}>
	<div class={style.pgBtn}>Random Page</div>
	{movieResults.results.map(movie => <MovieItem selectedGenre={selectedGenre.id} key={movie.id} movie={movie}><button onClick={() => suggest(movie)}>Προτείνω</button></MovieItem>)}
	<ReactPaginate
		containerClassName={style.pgContainer}
		previousClassName={style.pgBtn}
		nextClassName={style.pgBtn}
		pageClassName={style.pgBtn}
		activeClassName={style.pgActive}
		onPageChange={this.nextPage}
		pageCount={movieResults.total_pages}
	/>
</div> : null;

export default MoviesSearchResults;