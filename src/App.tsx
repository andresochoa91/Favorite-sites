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
      <Switch>
        <Route exact path="/" render={() => (
          <div className="d-flex justify-content-center mt-5">
            <Jumbotron className="text-center p-5" fluid>
              <Container>
                <SignForms /> 
              </Container>
            </Jumbotron>
          </div>
        )}/>
        <Route path="/home" component={ Home } />
      </Switch>
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
