import React, { createContext, useState, useEffect, FC } from 'react';
import { auth, firestore } from '../Firebase/Firebase.utils';

interface IAdditionalData {
  userName: string | null;
  zipCode: string | null; 
} 

interface ICurrentUser {
  uid: string;
  displayName: string | null;
}

export interface IContextProps {
  createUserDocument: (userAuth: firebase.User | null, additionalData?: IAdditionalData) => Promise<void>,
  currentUser: firebase.User | null,
  currentUserName: string,
  currentUserId: string,
  currentUserEmail: string | null,
  currentUserZipCode: string,
  currentUserSites: Array<string>,
  setCurrentUserZipCode: React.Dispatch<React.SetStateAction<string>>,
  setCurrentUserName: React.Dispatch<React.SetStateAction<string>>,
  setCurrentUserSites: React.Dispatch<React.SetStateAction<string[]>>
}

const PracticeFirebaseContext = createContext({} as IContextProps);

const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<firebase.User | null>(null);
  const [ currentUserId, setCurrentUserId ] = useState<string>("");
  const [ currentUserName, setCurrentUserName ] = useState<string>("");
  const [ currentUserEmail, setCurrentUserEmail ] = useState<string | null>("");
  const [ currentUserSites, setCurrentUserSites ] = useState<Array<string>>([]);
  const [ currentUserZipCode, setCurrentUserZipCode ] = useState<string>("");
  // const [ currentImage, setCurrentImage ] = useState<string>("")

  const createUserDocument = async(userAuth: firebase.User | null, additionalData?: any):Promise<void> => {
    if (!userAuth) return;

    const userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firestore.doc(`users/${userAuth.uid}`);
    const snapshot: any = await userRef.get();

    if (!snapshot.exist) {
      const { email, uid } = userAuth;
      const createdAt = new Date();
      const { userName, zipCode } = additionalData;

      try {
        await userRef.set({
          sites: [],
          email,
          createdAt,
          ...additionalData
        })
        setCurrentUserSites([]);
        setCurrentUserName(userName);
        setCurrentUserId(uid);
        setCurrentUserEmail(email);
        setCurrentUserZipCode(zipCode);

      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const unmount = auth.onAuthStateChanged(setCurrentUser);
    if (!currentUser) {
      setCurrentUserName("");
      setCurrentUserEmail("");
      setCurrentUserId("");
      return () => unmount();
    }

    const { uid, displayName } = currentUser;

    firestore.collection("users").doc(uid).get()
    .then((doc: any) => {
      let dData = doc.data()
      if (!dData) { 
        if (displayName) {
          createUserDocument(currentUser, { userName: displayName, zipCode: null });
        }
      } else {
        const { userName, email, sites, zipCode } = dData;
        setCurrentUserName(userName);
        setCurrentUserId(uid);
        setCurrentUserEmail(email);
        setCurrentUserSites(sites);
        setCurrentUserZipCode(zipCode);
      }
    })
    .catch((err) => console.error(err));

    return () => unmount();
  }, [currentUser]);

  return (
    <PracticeFirebaseContext.Provider value={{
      createUserDocument,
      currentUser,
      currentUserId,
      currentUserName,
      currentUserEmail,
      currentUserZipCode,
      setCurrentUserZipCode,
      setCurrentUserName,
      currentUserSites,
      setCurrentUserSites,
      // currentImage
    }}>
      { children }
    </PracticeFirebaseContext.Provider>
  );
}

export { Provider, PracticeFirebaseContext };