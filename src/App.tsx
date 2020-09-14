import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext, IContextProps } from './Context';
// import Home from './Components/Home';
import MainNavbar from './Components/Home/MainNavbar/MainNavbar';
import Sites from './Components/Home/Sites/Sites';
import UpdatePersonalInfo from './Components/Home/UpdatePersonalInfo/UpdatePersonalInfo';
import { Switch, Route, Redirect} from 'react-router-dom';
import SignForms from './Components/SignForms/SignForms';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './Components/Home/Weather/Weather';
import sunset from './sunset.jpg';

const App: SFC = () => {
  const { currentUser, loggedOut } = useContext<IContextProps>(PracticeFirebaseContext);
  return (
    <div
      style={{
        backgroundImage: `url(${sunset})`,
        position: "absolute",
        minWidth: "100%",
        minHeight: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {
        currentUser 
          ?
        <>
          <MainNavbar />
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/weather" /> }/>
            <Route exact path="/weather" component={ Weather } />
            <Route exact path="/sites" component={ Sites } />
            <Route exact path="/update" component={ UpdatePersonalInfo } />
            <Route render={ () => <Redirect to={{pathname: "/"}} /> } />
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
    </div>
  );
}

export default App;
