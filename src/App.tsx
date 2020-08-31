import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext } from './Context';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';

interface IContext {
  currentUser: {};
  currentImage: string
}

const App: SFC = () => {
  const { currentUser/* , currentImage */ } = useContext<IContext>(PracticeFirebaseContext)

  return (
    <div className="App">
      {
        currentUser 
        ?
        <Home />
        :
        <>
          <SignIn />
          <SignUp />
          <ForgotPassword />
          {/* <img src={ `${currentImage}` } alt=""/> */}
        </>
      }
    </div>
  );
}

export default App;
