import tmdb from 'themoviedb-javascript-library';
import { switchMap } from 'rxjs/operators';
import { from, of, combineLatest } from 'rxjs';

tmdb.common.api_key = 'aefa00ea9c0decea7c130b903308ad02';

tmdb.common.base_uri = 'https://api.themoviedb.org/3/';
tmdb.common.images_uri = 'https://image.tmdb.org/t/p/';


export function searchMovies(title$, page$, mode$, genre$) {
	return combineLatest(title$, page$, mode$).pipe(switchMap(([title, page, mode]) => {
		if (mode === 'search') {
			if (title.trim() === '') return of(null);
			return from(new Promise((resolve, reject) => {
				tmdb.search.getMovie({
					query: title,
					page
				}, response => resolve(JSON.parse(response)), reject);
			}));
		}
		else if (mode === 'discover') {
			// if (!genre) return of(null);
			// return from(discoverMoviesOf(genre, page));
			return genre$.pipe(switchMap(genre => {
				if (!genre) return of(null);
				return from(discoverMoviesOf(genre.id, page));
			}));
		}
		return of(null);
	}));
}

export function getMoviePoster(image) {
	return `https://image.tmdb.org/t/p/w92/${image}`;
}

export function getGenres() {
	return new Promise((resolve, reject) => {
		tmdb.genres.getMovieList({}, response => resolve(JSON.parse(response).genres), reject);
	});
}

export function getMoviesOf(id, page) {
	return new Promise((resolve, reject) => {
		tmdb.genres.getMovies({ id, page }, response => resolve(JSON.parse(response)), reject);
	});
}

export function discoverMoviesOf(id, page) {
	return new Promise((resolve, reject) => {
		tmdb.discover.getMovies({ with_genres: `${id}`, sort_by: 'primary_release_date.desc', page }, response => resolve(JSON.parse(response)), reject);
	});
}
window.getGenres = getGenres;