import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';


export const PersonalContext = createContext<any>({
  greeting: "",
  currentUser: null
});

export const Provider: React.FC<any> = (props) => {
  const [ greeting ] = useState<string>("Hello");
  const [ currentUser, setCurrentUser ] = useState<any>(null);

  useEffect(() => {
    let unsubscribeFromUserRef: () => void;
    const unsubscribeFromAuthState = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef: any = await createUserProfileDocument(userAuth);
        unsubscribeFromUserRef = userRef.onSnapshot((snapShot: any):void => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      // console.log(currentUser)
      setCurrentUser(userAuth);
    })
    return () => {
      unsubscribeFromAuthState();
      unsubscribeFromUserRef();
    };
  }, []);


  return (
    <PersonalContext.Provider value={{
      greeting,
      currentUser
    }}>
      { props.children }
    </PersonalContext.Provider>
  );
}

