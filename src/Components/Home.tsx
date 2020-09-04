import React, { useContext, SFC } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext } from '../Context';
import Update from './Update';
import AddSites from './AddSites';

interface IContext {
  currentUserName: string;
  currentUserZipCode: string;
}

const Home: SFC = () => {
  const {  currentUserName, currentUserZipCode } = useContext<IContext>(PracticeFirebaseContext);

  return (
    <>
      {
        currentUserName && 
        <>
          <button onClick={() => auth.signOut()}>Sign out</button>
          <h1>Welcome { currentUserName }</h1>
          <h2>Zip Code: { currentUserZipCode }</h2>
          <Update />
          <AddSites />
        </>
      }
    </>
  );
}

export default Home;