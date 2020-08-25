import React, { useContext } from 'react';
import Header from './Components/Header';
import { PersonalContext } from './Context';

interface IContext {
  greeting: string
}

const App: React.FC = () => {
  const { greeting } = useContext<IContext>(PersonalContext) 
  

  return (
    <div className="App">
      <Header />
      <h1>{ greeting }</h1>
    </div>
  );
};

export default App;
