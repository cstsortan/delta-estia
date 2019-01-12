// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// admin.firestore().settings({
// 	timestampsInSnapshots: true
// });

// exports.updateCount = functions.firestore
// 	.document('washers/{washerId}')
// 	.onUpdate((change, context) => {
// 		return admin.firestore().collection('washers')
// 			.get()
// 			.then(snap => snap.docs)
// 			.then(docs => {
// 				const washers = docs.map(doc => doc.data());
// 				return washers.filter(washer => washer.functional && isDone(washer.endsAt)).length;
// 			})
// 			.then(count => admin.firestore().collection('status').doc('washers').update({ count }));
// 	});

// function isDone(endsAt) {
// 	const delta = endsAt.toMillis() - Date.now();
// 	return delta < 0;
// }