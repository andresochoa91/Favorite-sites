import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';


export const PersonalContext = createContext<any>({
  greeting: "",
  currentUser: null
});

export const Provider: React.FC<any> = (props) => {
  const [ greeting ] = useState<string>("Hello amigo");
  const [ currentUser, setCurrentUser ] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef: any = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot: any) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data
          })
        })
      }
      setCurrentUser(userAuth); 
    })
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
