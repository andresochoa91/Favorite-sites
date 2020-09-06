import React, { useContext, SFC } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import Update from './Update';
import Sites from './Sites';

const Home: SFC = () => {
  const {  currentUserName, currentUserZipCode } = useContext<IContextProps>(PracticeFirebaseContext);

  return (
    <>
      {
        currentUserName && 
        <>
          <button onClick={() => auth.signOut()}>Sign out</button>
          <h1>Welcome { currentUserName }</h1>
          <h2>Zip Code: { currentUserZipCode }</h2>
          <Update />
          <Sites />
        </>
      }
    </>
  );
}

export default Home;