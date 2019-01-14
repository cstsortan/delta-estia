/* eslint-disable react/jsx-no-bind */
import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { searchMovies } from '../../services/tmdb';
import MovieItem from './MovieItem';
import { suggestMovie, getSuggestedMovies, voteMovie } from '../../services/firebase';
import firebase from 'firebase/app';
const auth = firebase.auth();
export default class Movies extends Component {
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
	suggest = (movie) => {
		this.setState({
			suggesting: false
		});
		suggestMovie(movie);
	};
	searchMovies = () => {
		searchMovies(this.state.movieText).then(res => {
			const json = JSON.parse(res);
			this.setState({ movieResults: json.results });
		});
	};
	state = {
		suggesting: false,
		movieText: '',
		movieResults: [],
		movies: []
	};
	
	componentWillMount() {
		this.moviesSub = getSuggestedMovies().subscribe(movies => this.setState({ movies }));
	}

	componentWillUnmount() {
		this.moviesSub.unsubscribe();
	}
	
	
	render({ }, { suggesting, movieText, movieResults, movies }) {
		return (
			<div class={style.moviesRoot}>
				{suggesting ? <div class={style.suggestions}>
					<div class={style.moviesForm}>
						<button onClick={this.closeSuggestions}>Πίσω</button>
						<input
							value={movieText}
							onInput={linkState(this, 'movieText')}
							class={style.movieInput}
							placeholder="Τίτλος ταινίας"
						/>
						<button onClick={this.searchMovies} class={style.movieButton}>Αναζήτηση</button>
					</div>
					<div class={style.results}>
						{movieResults.map(movie => <MovieItem movie={movie}><button onClick={() => this.suggest(movie)}>Προτείνω</button></MovieItem>)}
					</div>
				</div>
				 : <div class={style.moviesList}>
						<button onClick={this.openSuggestions} class={style.openSuggestionsButton}>Προτείνετε ταινία για την Κυριακή!</button>
						<div>
							{movies.map(movie => (<MovieItem movie={movie}>
								<div class={style.voters}>
									{movie.voters.map(voter => <img class={style.voter} src={voter} />)}
								</div>
								<button onClick={() => this.voteMovie(movie.id)}>Ψηφίστε</button>
							</MovieItem>))}
						</div>
					</div>}
			</div>
		);
	}
}