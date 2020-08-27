import React, { useContext } from 'react';
import Header from './Components/Header';
import { PersonalContext } from './Context';

interface IContext {
  greeting: string
  currentUser: any
}

const App: React.FC = () => {
  const { greeting, currentUser } = useContext<IContext>(PersonalContext); 
  
  return (
    <div className="App">
      {console.log(currentUser)}
      <Header />
      <h1>{ greeting }</h1>
    </div>
  );
};

export default App;
