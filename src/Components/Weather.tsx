import React, { SFC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const Weather:SFC = () => {
  const { currentWeather, currentUserName, currentUserZipCode } = useContext<IContextProps>(PracticeFirebaseContext);
  return (
    <>
      {
        (currentWeather && currentWeather.name) 
        ?
          <>
            <h2 className="mt-4 text-center">Welcome { currentUserName }</h2>
            <h4 className="text-center">This is your Zip Code: { currentUserZipCode }</h4>
            <h5 className="text-center">The following weather calculation is based on your zip code. You can always update your Zip Code.</h5>

            <Card className="mx-auto text-center my-5" style={{ width: '30rem' }}>    
              <Card.Body>
                <h2>
                  <strong>
                    { currentWeather.name }
                  </strong>
                </h2>
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt=""/>
                <h5 className="text-capitalize">
                  <strong>
                    Description: { currentWeather.weather[0].description }
                  </strong>
                </h5>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Feels like: { currentWeather.main.feels_like } F°</ListGroupItem>
                <ListGroupItem>Humidity: { currentWeather.main.humidity } F°</ListGroupItem>
                <ListGroupItem>Pressure: { currentWeather.main.pressure } hPa</ListGroupItem>
                <ListGroupItem>Current temperature: { currentWeather.main.temp }%</ListGroupItem>
                <ListGroupItem>Maximum temperature: { currentWeather.main.temp_max } F°</ListGroupItem>
                <ListGroupItem>Minimum temperature: { currentWeather.main.temp_min } F°</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="https://getcityweather.netlify.app" target="_black">
                  Get more information
                </Card.Link>
              </Card.Body>
            </Card>
          </>
        :  
          <div className="text-center my-5">
            <h3>The zipcode is not valid.</h3>
            <p>Update your zip code going to the "Update" tab.</p>
          </div>
      }
    </>
  ); 
}

export default Weather;
