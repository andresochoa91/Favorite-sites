import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext } from './Context';
import Home from './Components/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignForms from './Components/SignForms';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";

interface IContext {
  currentUser: any;
  currentImage: string
}

const App: SFC = () => {
  const { currentUser/* , currentImage */ } = useContext<IContext>(PracticeFirebaseContext)

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
          <Redirect to={`/home/${currentUser.uid}`} />
        :
          <Redirect to="/" />
      }
      {/* <img src={ `${currentImage}` } alt=""/> */}
    </>
  );
}

export default App;
