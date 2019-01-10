import firebase from 'firebase/app';
import {
	collectionData
} from 'rxfire/firestore';
import { switchMap } from 'rxjs/operators';

export function getPosts(limit$) {
	return limit$.pipe(switchMap(limit => {
		const query = firebase.firestore().collection('posts')
			.orderBy('timestamp', 'desc')
			.limit(limit);
		return collectionData(query, 'id');
	}));
}