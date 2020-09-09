import React, { useContext, SFC } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import Update from './Update';
import Sites from './Sites';
import { Link, Route, Switch } from 'react-router-dom';
import Weather from './Weather';

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
          <Weather />
          <Switch>
            <Route exact path="/home" />
            <Route path="/home/update" component={ Update } />
            <Route path="/home/sites" component={ Sites } />
          </Switch>
          <Link to="/home">Home</Link>
          <Link to="/home/update">Update</Link>
          <Link to="/home/sites">Sites</Link>
        </>
      }
    </>
  );
}

export default Home;