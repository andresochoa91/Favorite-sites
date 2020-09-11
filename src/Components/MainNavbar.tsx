import React, { SFC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import { auth } from '../Firebase/Firebase.utils';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Update from './Update';
import Sites from './Sites';
import { NavLink, Route, Switch } from 'react-router-dom';
import Weather from './Weather';

const MainNavbar: SFC = () => {

  const {  currentUserName } = useContext<IContextProps>(PracticeFirebaseContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavLink className="text-light h5 mb-0 text-decoration-none" to="/home">{ currentUserName }</NavLink>
        <Nav className="mr-auto">
          <NavLink className="mx-4 text-info" to="/home">Home</NavLink>
          <NavLink className="mr-4 text-info" to="/home/sites">Sites</NavLink>
          <NavLink className="mr-4 text-info" to="/home/update">Update</NavLink>
        </Nav>
        <Button variant="outline-info" onClick={() => auth.signOut()}>Sign out</Button>
      </Navbar>      
      <Switch>
        <Route exact path="/home" component={ Weather } />
        <Route path="/home/sites" component={ Sites } />
        <Route path="/home/update" component={ Update } />
      </Switch>
    </>
  );
}

export default MainNavbar;