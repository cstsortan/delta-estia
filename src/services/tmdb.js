import tmdb from 'themoviedb-javascript-library';

tmdb.common.api_key = 'aefa00ea9c0decea7c130b903308ad02';

tmdb.common.base_uri = 'https://api.themoviedb.org/3/';
tmdb.common.images_uri = 'https://image.tmdb.org/t/p/';

export function searchMovies(title) {
	return new Promise((resolve, reject) => {
		tmdb.search.getMovie({
			query: title
		}, resolve, reject);
	});
}

export function getMoviePoster(image) {
	return `http://image.tmdb.org/t/p/w92/${image}`;
}