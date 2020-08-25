import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBqR-jjecVsbGA0L3D-hhJWPQUyUKG0Rfs",
  authDomain: "personal-558b5.firebaseapp.com",
  databaseURL: "https://personal-558b5.firebaseio.com",
  projectId: "personal-558b5",
  storageBucket: "personal-558b5.appspot.com",
  messagingSenderId: "843378730464",
  appId: "1:843378730464:web:81240f7986cfccabaa7785",
  measurementId: "G-5FFT6YKMTH"
};

export const createUserProfileDocument = async (userAuth: any, additionalData?: any) => {
  if (!userAuth) return;
  
  const userRef:any = firestore.doc(`users/${userAuth.uid}`);
  const snapShot:any = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error);
    }
  } 

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
