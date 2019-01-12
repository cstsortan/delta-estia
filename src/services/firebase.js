import firebase from 'firebase/app';
import {
	collectionData
} from 'rxfire/firestore';
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