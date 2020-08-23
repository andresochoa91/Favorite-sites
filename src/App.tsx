import React, { useContext } from 'react';
import { PersonalContext } from './Context';

interface IContext {
  greeting: string
}

const App: React.FC = () => {
  const { greeting } = useContext<IContext>(PersonalContext) 
  return (
    <div className="App">
      <h1>{ greeting }</h1>
    </div>
  );
};

export default App;
