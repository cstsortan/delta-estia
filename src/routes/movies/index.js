/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { searchMovies, getGenres } from '../../services/tmdb';
import MovieItem from './MovieItem';
import { suggestMovie, getSuggestedMovies, voteMovie, voteGenre } from '../../services/firebase';
import firebase from 'firebase/app';
import ReactPaginate from 'react-paginate';
import { BehaviorSubject, combineLatest, from } from 'rxjs';
import MoviesSuggestionsList from './MoviesSuggestionsList';

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
			suggesting: true
		});
	}
	closeSuggestions = () => {
		this.setState({
			suggesting: false
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
			suggesting: false
		});
		suggestMovie(movie);
	};
	searchMovies = () => {
		this.page$.next(1);
		this.title$.next(this.state.movieText);
	};
	state = {
		discover: false,
		suggesting: false,
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
	render({ }, { suggesting, movieText, movieResults, movies, discover, suggestingGenre, genreVoters, allGenres, selectedGenre }) {
		return (
			<div class={style.moviesRoot}>
				{suggestingGenre ? <div>
					<div class={style.textCenter}>Παρακαλώ επιλέξτε είδος</div>
					{allGenres.map(genre => (<div class={style.genre} onClick={() => this.voteGenre(genre.id)} key={genre.id}>
						<h4 class={style.genreName}>{genre.name}</h4>
						<div class={style.voters}>{genreVoters[genre.id] ?
							genreVoters[genre.id]
								.map(voterImage =>
									<img class={style.voter} key={voterImage} src={voterImage} />) : null}</div>
					</div>))}
				</div> : suggesting ? <div ref={results => this.resultsRef = results} class={style.suggestions}>
					<div class={style.searchOptions}>
						<div class={!discover && style.searchOptionActive} onClick={this.selectSearch}>Search</div>
						<div class={discover && style.searchOptionActive} onClick={this.selectDiscover}>Discover</div>
					</div>
					{!discover ? <div class={style.moviesForm}>
						<button onClick={this.closeSuggestions}>Πίσω</button>
						<input
							value={movieText}
							onInput={linkState(this, 'movieText')}
							class={style.movieInput}
							placeholder="Τίτλος ταινίας"
						/>
						<button onClick={this.searchMovies} class={style.movieButton}>Αναζήτηση</button>
					</div> : null}
					{movieResults ? <div class={style.results}>
						<div class={style.pgBtn}>Random Page</div>
						{movieResults.results.map(movie => <MovieItem selectedGenre={selectedGenre.id} key={movie.id} movie={movie}><button onClick={() => this.suggest(movie)}>Προτείνω</button></MovieItem>)}
						<ReactPaginate
							containerClassName={style.pgContainer}
							previousClassName={style.pgBtn}
							nextClassName={style.pgBtn}
							pageClassName={style.pgBtn}
							activeClassName={style.pgActive}
							onPageChange={this.nextPage}
							pageCount={movieResults.total_pages}
						/>
					</div> : null}
				</div>
				 :<MoviesSuggestionsList movies={movies} selectedGenre={selectedGenre} voteMovie={this.voteMovie} />}
			</div>
		);
	}
}