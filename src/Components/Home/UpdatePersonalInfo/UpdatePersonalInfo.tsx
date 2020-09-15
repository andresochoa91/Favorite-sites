import React, { FC, useContext, useState } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../../../Context';
import { firestore } from '../../../Firebase/Firebase.utils';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Redirect } from 'react-router-dom';
import MainModal from '../../MainModal/MainModal';

const UpdatePersonalInfo: FC = () => {

  const { 
    currentUserId,
    currentUserName,
    setCurrentUserName, 
    currentUserZipCode, 
    setCurrentUserZipCode,
    setCurrentWeather,
    currentMessage,
    setCurrentMessage,
    currentMessageValidation,
    setCurrentMessageValidation
  } = useContext<IContextProps>(PracticeFirebaseContext);
  
  const [ tempUserName, setTempUserName ] = useState<string>("");
  const [ tempZipCode, setTempZipCode ] = useState<string>("");
  const [ updating, setUpdating ] = useState<boolean>(true);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
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
  
      const getApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${updatedZipCode},us&appid=${apiKey}&units=imperial`);
      const getWeather = await getApi.json();
      
      if (getWeather.cod === 200) {
        setCurrentWeather(getWeather);
        await userRef.update({
          zipCode: updatedZipCode,
          userName: updatedUserName
        });
        setCurrentUserZipCode(updatedZipCode);
      } else {
        setCurrentMessage(`Your input is invalid.\nEnter a valid zip code or leave blank to not update (only if current zip code is already valid)`)
        setCurrentMessageValidation(true);
        return;
      }
      setCurrentUserName(updatedUserName);
      setTempUserName("");    
      setTempZipCode("");
      setUpdating(false);    
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <MainModal 
        currentMessageValidation={ currentMessageValidation } 
        setCurrentMessageValidation={ setCurrentMessageValidation }
        titleMessage="Error updating"
      >
        <p>{ currentMessage }</p>
      </MainModal>
      {
        updating 
        ?
          <Container 
            className="my-5 text-white"
          >
            <Jumbotron
              style={{
                backgroundColor: "rgba(0,0,0,0.65)"
              }}
              className="w-50 mx-auto"
            >
              <h3 className="text-center">Update</h3>
              <Form onSubmit={ handleSubmit }>
                <Form.Group>
                  <Form.Label>Update name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter new name" 
                    onChange={ handleInput } 
                    name="tempUserName"
                    value={ tempUserName }
                  />
                  <Form.Text className="text-white">
                    Leave blank to not change your user name.
                  </Form.Text>
                </Form.Group>
      
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Update zip code</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ex: 94555"
                    onChange={ handleInput } 
                    name="tempZipCode"
                    value={ tempZipCode }
                  />
                  <Form.Text className="text-white">
                    Leave blank to not change your zip code.
                  </Form.Text>
                </Form.Group>
                <Button className="w-100 d-block mx-auto" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Jumbotron>
          </Container>
        : 
          <Redirect to="/home"/> 
      }
    </>
  ); 
}

export default UpdatePersonalInfo;