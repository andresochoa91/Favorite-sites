import React, { FC, useContext, useState, useEffect } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import { firestore } from '../Firebase/Firebase.utils';

const Update: FC = () => {

  const { 
    currentUserId,
    currentUserName,
    setCurrentUserName, 
    currentUserZipCode, 
    setCurrentUserZipCode,
    setCurrentWeather,
  } = useContext<IContextProps>(PracticeFirebaseContext);
  
  const [ tempUserName, setTempUserName ] = useState<string>("");
  const [ tempZipCode, setTempZipCode ] = useState<string>("");

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    (name === "tempUserName" ? setTempUserName(value) : setTempZipCode(value));
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();

    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  
      const userRef = firestore.doc(`users/${currentUserId}`);
      const updatedUserName = tempUserName ? tempUserName : currentUserName;
      const updatedZipCode = tempZipCode ? tempZipCode : currentUserZipCode; 
  
      const getApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${tempZipCode},us&appid=${apiKey}`);
      const getWeather = await getApi.json();
      
      console.log(getWeather);

      if (getWeather.cod === 200) {
        setCurrentWeather(getWeather);
        await userRef.update({
          userName: updatedUserName,
          zipCode: updatedZipCode
        });
        setCurrentUserZipCode(updatedZipCode);
      } else {
        alert("Your input is incorrect. Enter a valid zip code");
        setCurrentWeather(null);
        setCurrentUserZipCode("");
        return;
      }
      setCurrentUserName(updatedUserName);
      setTempUserName("");    
      setTempZipCode("");    
    } catch(err) {
      console.error(err);
    }
    // userRef.get()
    // .then((response: any) => console.log(response.data()))
  }

  
  useEffect(() => {

  }, [ currentUserZipCode, setCurrentUserZipCode, setCurrentWeather ]);

  return (
    <>
      <h1>Update</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="">Update name</label>
        <input 
          onChange={ handleInput } 
          type="text"
          name="tempUserName"
          value={ tempUserName }
        />
        <label htmlFor="">Update Zip Code</label>
        <input 
          onChange={ handleInput } 
          type="text"
          name="tempZipCode"
          value={ tempZipCode }
        />
        <button type="submit">Update</button>
      </form>
    </>
  ); 
}

export default Update;