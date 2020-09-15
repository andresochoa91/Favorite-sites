import React, { createContext, useState, useEffect, FC } from 'react';
import { auth, firestore } from '../Firebase/Firebase.utils';

interface IAdditionalData {
  userName: string;
  zipCode: string; 
} 

interface IWeatherSpecs {
  icon: string;
  description: string;
}

interface IMainWeather {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface ICurrentWeather {
  name: string;
  weather: Array<IWeatherSpecs>;
  main: IMainWeather;
}

export interface IContextProps {
  createUserDocument: (userAuth: firebase.User | null, additionalData: IAdditionalData) => Promise<void>,
  currentUser: firebase.User | null,
  currentUserName: string,
  currentUserId: string,
  currentUserEmail: string | null,
  currentUserZipCode: string,
  currentUserSites: Array<string>,
  setCurrentUserZipCode: React.Dispatch<React.SetStateAction<string>>,
  setCurrentUserName: React.Dispatch<React.SetStateAction<string>>,
  setCurrentUserSites: React.Dispatch<React.SetStateAction<string[]>>,
  currentWeather: ICurrentWeather | null;
  setCurrentWeather: React.Dispatch<React.SetStateAction<ICurrentWeather | null>>;
  loggedOut: boolean;
  setLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  currentMessageValidation: boolean;
  setCurrentMessageValidation: React.Dispatch<React.SetStateAction<boolean>>;
}

const PracticeFirebaseContext = createContext({} as IContextProps);

const Provider: FC = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<firebase.User | null>(null);
  const [ currentUserId, setCurrentUserId ] = useState<string>("");
  const [ currentUserName, setCurrentUserName ] = useState<string>("");
  const [ currentUserEmail, setCurrentUserEmail ] = useState<string | null>("");
  const [ currentUserSites, setCurrentUserSites ] = useState<Array<string>>([]);
  const [ currentUserZipCode, setCurrentUserZipCode ] = useState<string>("");
  const [ currentWeather, setCurrentWeather ] = useState<ICurrentWeather | null>(null);
  const [ loggedOut, setLoggedOut ] = useState<boolean>(false);
  const [ currentMessage, setCurrentMessage ] = useState<string>("");
  const [ currentMessageValidation, setCurrentMessageValidation ] = useState<boolean>(false);

  const createUserDocument = async(userAuth: firebase.User | null, additionalData: IAdditionalData):Promise<void> => {
    if (!userAuth) return;

    const userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firestore.doc(`users/${userAuth.uid}`);
    const snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await userRef.get()!;

    if (!snapshot.exists) {
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
        setLoggedOut(false);
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
      setCurrentUserZipCode("");
      return () => unmount();
    }

    const { uid, displayName } = currentUser;

    firestore.collection("users").doc(uid).get()
    .then(doc => {
      let dData = doc.data()
      if (!dData) { 
        if (displayName) {
          createUserDocument(currentUser, { userName: displayName, zipCode: "" });
        }
      } else {
        const { userName, email, sites, zipCode } = dData;
        setCurrentUserName(userName);
        setCurrentUserId(uid);
        setCurrentUserEmail(email);
        setCurrentUserSites(sites);
        setCurrentUserZipCode(zipCode);
        setLoggedOut(false);
      }
    })
    .catch((err) => console.error(err));

    return () => unmount();
  }, [currentUser]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${currentUserZipCode},us&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        setCurrentWeather(data);
      } else {
        setCurrentWeather(null);
        setCurrentUserZipCode("");
      }
    })
    .catch(error => console.error(error));
  }, [ currentUserZipCode ]);

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
      currentWeather,
      setCurrentWeather,
      loggedOut,
      setLoggedOut,
      currentMessage, 
      setCurrentMessage,
      currentMessageValidation, 
      setCurrentMessageValidation
    }}>
      { children }
    </PracticeFirebaseContext.Provider>
  );
}

export { Provider, PracticeFirebaseContext };