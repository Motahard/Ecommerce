import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDGmbD9AH0borK-sG57ivZyfQvaAEeAYjE',
  authDomain: 'ecommerce-ninja.firebaseapp.com',
  databaseURL: 'https://ecommerce-ninja.firebaseio.com',
  projectId: 'ecommerce-ninja',
  storageBucket: 'ecommerce-ninja.appspot.com',
  messagingSenderId: '907430836090',
  appId: '1:907430836090:web:db8e5b9f5e1f26d9ac48c3',
  measurementId: 'G-CJYJVTJBZY'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (e) {
      console.log('error creating user', e.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;