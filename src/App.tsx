import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext, IContextProps } from './Context';
import Home from './Components/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignForms from './Components/SignForms';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";

const App: SFC = () => {
  const { currentUser/* , currentImage */ } = useContext<IContextProps>(PracticeFirebaseContext)

  return (
    <>
      <Jumbotron className="text-center" fluid>
        <Container>
          <Switch>
            <Route exact path="/" component={ SignForms }/>
            <Route path="/home" component={ Home } />
          </Switch>
        </Container>
      </Jumbotron>
      
      {
        currentUser 
        ?
          <Redirect to="/home" />
        :
          <Redirect to="/" />
      }
      {/* <img src={ `${currentImage}` } alt=""/> */}
    </>
  );
}

export default App;
