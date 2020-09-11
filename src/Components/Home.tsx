import React, { useContext, SFC } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import MainNavbar from './MainNavbar';

const Home: SFC = () => {
  const {  currentUserName } = useContext<IContextProps>(PracticeFirebaseContext);

  return (
    <>
      {
        currentUserName && <MainNavbar />
      }
    </>
  );
}

export default Home;