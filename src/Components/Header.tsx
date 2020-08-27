import React, { useContext } from 'react';
import { PersonalContext } from '../Context';
import { auth } from '../firebase/firebase.utils';
import SignInSignUp from './SignInSignUp';
import Edit from './Edit';
import ForgotPassword from './ForgotPassword'

const Header: React.FC = () => {
  const { currentUser } = useContext(PersonalContext)
  return (
    <>
      {/* <SignInSignUp /> */}
      {
        currentUser 
        // &&
        ?
        <>
          <button onClick={() => auth.signOut()}>Sign out</button> 
          <Edit />
        </> 
        :
        <>
          <SignInSignUp />
          <ForgotPassword />
        </>
      }    
    </> 
  );  
}

export default Header;