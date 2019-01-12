import firebase from 'firebase/app';
import {
	collectionData
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