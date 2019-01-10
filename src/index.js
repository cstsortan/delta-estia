import './style';
import App from './components/app';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronCircleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronCircleDown, faPlusCircle);

export default App;
const config = {
	apiKey: 'AIzaSyBxHhfp3bkEP694Mjc9gcxtaSV2RWPSdjI',
	authDomain: 'delta-estia.firebaseapp.com',
	databaseURL: 'https://delta-estia.firebaseio.com',
	projectId: 'delta-estia',
	storageBucket: 'delta-estia.appspot.com',
	messagingSenderId: '24506276035'
};
firebase.initializeApp(config);

firebase.firestore().settings({
	timestampsInSnapshots: true
});

firebase.firestore().enablePersistence()
	.catch((err) => {
		if (err.code === 'failed-precondition') {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
		}
		else if (err.code === 'unimplemented') {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
		}
	});