import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext, IContextProps } from './Context';
// import Home from './Components/Home';
import MainNavbar from './Components/MainNavbar';
import Sites from './Components/Sites';
import Update from './Components/Update';
import { Switch, Route, Redirect} from 'react-router-dom';
import SignForms from './Components/SignForms';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './Components/Weather';

const App: SFC = () => {
  const { currentUser, loggedOut } = useContext<IContextProps>(PracticeFirebaseContext);

  return (
    <>
      {
        currentUser 
          ?
        <>
          <MainNavbar />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/weather" /> }/>
            <Route exact path="/weather" component={ Weather } />
            <Route exact path="/sites" component={ Sites } />
            <Route exact path="/update" component={ Update } />
            {/* <Route path="/:novalid" render={ () => <Redirect to="/" /> } /> */}
          </Switch>
        </>
          :
        loggedOut 
          ?
        <>
          <Redirect to="/" />   
          <SignForms />
        </>
          :  
        <SignForms />
      }
    </>
  );
}

export default App;
