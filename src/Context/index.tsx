import React, { createContext, useState, useEffect, FC } from 'react';
import { auth, firestore } from '../Firebase/Firebase.utils';

const PracticeFirebaseContext = createContext<any>({});

const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<any>(null);
  const [ currentUserName, setCurrentUserName ] = useState<string>("");
  const [ currentUserEmail, setCurrentUserEmail ] = useState<string>("");
  const [ currentUserSites, setCurrentUserSites ] = useState<Array<string>>([]);
  const [ currentUserZipCode, setCurrentUserZipCode ] = useState<string>("");
  // const [ currentImage, setCurrentImage ] = useState<string>("")

  const createUserDocument = async(userAuth: any, additionalData?: any) => {
    if (!userAuth) return;

    const userRef: any = firestore.doc(`users/${userAuth.uid}`);
    const snapshot: any = await userRef.get();

    if (!snapshot.exist) {
      const { email } = userAuth;
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
        setCurrentUserEmail(email);
        setCurrentUserSites(sites);
        setCurrentUserZipCode(zipCode);
      }
    })
    .catch((err: any) => console.error(err));

    return () => unmount();
  }, [currentUser]);

  // useEffect(() => {
  //   let url = "www.facebook.com";
  //   let apiKey = "fc060f45460f62cf";
    
  //   // fetch(`http://api.page2images.com/restfullink?p2i_url=${url}&p2i_key=${apiKey}&p2i_device=6`)
  //   fetch(`http://api.page2images.com/restfullink?p2i_url=${url}&p2i_key=${apiKey}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setCurrentImage(data.image_url);
  //   })
  // }, []) 

  return (
    <PracticeFirebaseContext.Provider value={{
      createUserDocument,
      currentUser,
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