import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext } from './Context';
import Home from './Components/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignForms from './Components/SignForms';

interface IContext {
  currentUser: any;
  currentImage: string
}

const App: SFC = () => {
  const { currentUser/* , currentImage */ } = useContext<IContext>(PracticeFirebaseContext)

  return (
    <>
      <Switch>
        <Route exact path="/" component={ SignForms }/>
        <Route path="/home" component={ Home } />
      </Switch>
      
      {
        currentUser 
        ?
        <Redirect to={`/home/${currentUser.uid}`} />
        :
        <Redirect to="/" />
      }
      {console.log(currentUser)}
      {/* <img src={ `${currentImage}` } alt=""/> */}
    </>
  );
}

export default App;
