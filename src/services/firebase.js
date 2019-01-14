import firebase from 'firebase/app';
import {
	collectionData, docData
} from 'rxfire/firestore';
import {
	listVal
} from 'rxfire/database';

import { switchMap, map } from 'rxjs/operators';

export function getPosts(limit$) {
	return limit$.pipe(switchMap(limit => {
		const query = firebase.firestore().collection('posts')
			.orderBy('timestamp', 'desc')
			.limit(limit);
		return collectionData(query, 'id');
	}));
}
export function getWashersStatus() {
	const query = firebase.firestore()
		.collection('washers');
	return collectionData(query)
		.pipe(map(docs => docs.filter(washer => washer.functional && isDone(washer.endsAt)).length));
}


function isDone(endsAt) {
	const delta = endsAt.toMillis() - Date.now();
	return delta < 0;
}

function uploadMessagePhoto(file) {
	return import('firebase/storage').then(() => {
		const photoRef = firebase.storage().ref('photos-messages').child(`${Date.now()}_${file.name}`);
		return photoRef.put(file);
	}).then(snap => snap.ref.getDownloadURL());
}

export function sendMessage(message) {
	const chatRef = firebase.database().ref('global-chat');
	return chatRef.push(message);
}

export function getChats(db) {
	return listVal(db.ref('global-chat').limitToLast(100), 'id');
}

export function suggestMovie(movie) {
	return getMovieWeekDoc()
		.set({
			movies: {
				[movie.id]: { ...movie }
			}
		}, { merge: true });
}

export function getSuggestedMovies(uid) {

	return docData(getMovieWeekDoc()).pipe(map(week => {
		if (!week.movies) return null;
		let movies = [];
		let votes = week.votes;
		Object.values(week.movies).forEach(movie => {
			let m = movie;
			m.voters = [];
			if (votes) {
				Object.keys(votes).forEach(v => {
					if (votes[v].movieId !== movie.id) return;
					m.voters = [...m.voters, votes[v].photoUrl];
				});
			}
			movies = [...movies, m];
		});
		return movies.sort((a, b) => b.voters.length - a.voters.length);
	}));
}

export function voteMovie(movieId, userUid, photoUrl) {
	return getMovieWeekDoc().update({
		votes: {
			[userUid]: { movieId, photoUrl }
		}
	});
}

function getMovieWeekDoc() {
	const curr = new Date(); // get current date
	curr.setHours(0, 0, 0, 0);
	const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
	const last = first + 6; // last day is the first day + 6
	
	const firstday = new Date(curr.setDate(first)).getTime();
	const lastday = new Date(curr.setDate(last)).getTime();
	return firebase.firestore().collection('movie-weeks')
		.doc(`${firstday}_${lastday}`);
}