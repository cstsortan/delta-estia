/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { searchMovies, getGenres } from '../../services/tmdb';
import { suggestMovie, getSuggestedMovies, voteMovie, voteGenre } from '../../services/firebase';
import firebase from 'firebase/app';
import { BehaviorSubject, combineLatest, from } from 'rxjs';
import GenreSuggest from './GenreSuggest';
import MovieSuggest from './MovieSuggest';

const auth = firebase.auth();
export default class Movies extends Component {
	
	mode$ = new BehaviorSubject('search');
	page$ = new BehaviorSubject(1);
	title$ = new BehaviorSubject('');
	genre$ = new BehaviorSubject(null);

	nextPage = (page) => {
		this.page$.next(page.selected + 1);
		this.resultsRef.scrollTo(0, 0);
	}
	selectSearch = () => {
		this.page$.next(1);
		this.mode$.next('search');
		this.setState({ discover: false });
	}
	selectDiscover = () => {
		this.page$.next(1);
		this.mode$.next('discover');
		this.setState({ discover: true });
	}
	openSuggestions = () => {
		this.setState({
			isSuggesting: true
		});
	}
	closeSuggestions = () => {
		this.setState({
			isSuggesting: false
		});
	}
	voteMovie = (movieId) => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			return;
		}
		voteMovie(movieId, currentUser.uid, currentUser.photoURL);
	};
	voteGenre = (genreId) => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			return;
		}
		voteGenre(genreId, currentUser.uid, currentUser.photoURL);
	}
	suggest = (movie) => {
		this.setState({
			isSuggesting: false
		});
		suggestMovie(movie);
	};
	searchMovies = () => {
		this.page$.next(1);
		this.title$.next(this.state.movieText);
	};
	state = {
		discover: false,
		isSuggesting: false,
		suggestingGenre: true,
		movieText: '',
		movieResults: null,
		movies: [],
		genreVoters: {},
		allGenres: [],
		selectedGenre: null
	};

	
	componentWillMount() {
		const date = new Date();
		date.setHours(0,0,0,0);
		if (date.getDay() >= 3) {
			this.setState({ suggestingGenre: false });
		}
	}
	
	
	componentDidMount() {
		this.moviesSub = searchMovies(this.title$, this.page$, this.mode$, this.genre$).subscribe(movieResults => {
			this.setState({
				movieResults
			});
		});
		this.sub = combineLatest(
			getSuggestedMovies(),
			from(getGenres())
		).subscribe(([options, allGenres]) => {
			const sortedGenres = options === null ? allGenres : allGenres.sort((a, b) => (options.genreVoters[b.id] || []).length - (options.genreVoters[a.id] || []).length);
			this.setState({
				movies: options.movies,
				genreVoters: options.genreVoters,
				allGenres: sortedGenres,
				selectedGenre: sortedGenres[0]
			});
			this.genre$.next(sortedGenres[0]);
		});
	}
	componentWillUnmount() {
		this.sub.unsubscribe();
		this.moviesSub.unsubscribe();
	}
	render({ }, { isSuggesting, movieText, movieResults, movies, discover, suggestingGenre, genreVoters, allGenres, selectedGenre }) {
		return (
			<div class={style.moviesRoot}>
				{suggestingGenre
					?
					<GenreSuggest
						allGenres={allGenres}
						genreVoters={genreVoters}
						onGenreVoted={this.voteGenre}
					/>
					:
					<MovieSuggest
						movie={movies}
						selectedGenre={selectedGenre}
						movieResults={movieResults}
						isSuggesting={isSuggesting}
						discover={discover}
						movieText={movieText}
						onMovieTextChanged={linkState(this, 'movieText')}
					/>}
			</div>
		);
	}
}
