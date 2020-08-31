import React, { useContext, SFC } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext } from '../Context';
import Update from './Update';
import AddSites from './AddSites';

const Home: SFC = () => {
  const {  currentUserName } = useContext(PracticeFirebaseContext);

  return (
    <>
      {
        currentUserName && 
        <>
          <button onClick={() => auth.signOut()}>Sign out</button>
          <h1>Welcome { currentUserName }</h1>
          <Update />
          <AddSites />
        </>
      }
    </>
  );
}

export default Home;