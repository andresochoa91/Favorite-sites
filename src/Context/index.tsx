import React, { createContext, useState } from 'react';

export const PersonalContext = createContext<any>({});

export const Provider: React.FC<any> = (props) => {
  const [ greeting ] = useState<string>("Hello amigo");
  console.log(props)
  return (
    <PersonalContext.Provider value={{
      greeting
    }}>
      { props.children }
    </PersonalContext.Provider>
  );
}
