import React, { SFC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';

const Weather:SFC = () => {
  const { currentWeather } = useContext<IContextProps>(PracticeFirebaseContext);
  console.log(currentWeather)
  return (
    <>
      {
        (currentWeather && currentWeather.name) 
        ?
          <h3>{currentWeather.name}</h3>
        :  
          <h3>The zipcode is not valid</h3>
      }
    </>
  ); 
}

export default Weather;
