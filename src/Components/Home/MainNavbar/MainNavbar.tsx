import React, { SFC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../../../Context';
import { auth } from '../../../Firebase/Firebase.utils';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import "../../../App.css";

const MainNavbar: SFC = () => {

  const {  currentUserName, setLoggedOut } = useContext<IContextProps>(PracticeFirebaseContext);

  const helper = () => {
    setLoggedOut(true);
    auth.signOut();
  }

  return (
    <>
      {
        currentUserName 
          && 
        <Navbar bg="dark" variant="dark" className="py-0">
          <NavLink className="text-light h5 mb-1 text-decoration-none" to="/home">{ currentUserName }</NavLink>
          <Nav className="mr-auto">
            <NavLink className="nav-link px-3 py-3 ml-3 text-info" to="/weather">Weather</NavLink>
            <NavLink className="nav-link px-3 py-3 text-info" to="/sites">Sites</NavLink>
            <NavLink className="nav-link px-3 py-3 text-info" to="/update">Update</NavLink>
          </Nav>
          <Button variant="outline-info" onClick={ helper }>Sign out</Button>
        </Navbar>
      }      
    </>
  );
}

export default MainNavbar;