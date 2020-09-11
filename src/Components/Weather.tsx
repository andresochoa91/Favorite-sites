import React, { SFC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const Weather:SFC = () => {
  const { currentWeather, currentUserName, currentUserZipCode } = useContext<IContextProps>(PracticeFirebaseContext);
  return (
    <Container className="mt-5">
      <Jumbotron
        className="text-white"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)"
        }}
      >
        {
          (currentWeather && currentWeather.name) 
          ?
            <>
              <h2 className="text-center">Welcome { currentUserName }</h2>
              <h4 className="text-center">This is your Zip Code: { currentUserZipCode }</h4>
              <h5 className="text-center">The following weather calculation is based on your zip code. You can always update your Zip Code.</h5>

              <Container 
                className="mx-auto text-center text-white py-3 mt-5 rounded" 
                style={{ 
                  width: '30rem', 
                  backgroundColor: "rgba(0,0,0,0.65)"
                }}>    
                <Table striped bordered className="mb-3 text-white">
                  <thead>
                    <tr>
                      <th className="text-capitalize h3">
                        <h2>
                          <strong>
                            { currentWeather.name }
                          </strong>
                        </h2>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt=""/></td></tr>
                    <tr><td className="h3">Description: { currentWeather.weather[0].description }</td></tr>
                    <tr><td>Feels like: { currentWeather.main.feels_like } F°</td></tr>
                    <tr><td>Humidity: { currentWeather.main.humidity } F°</td></tr>
                    <tr><td>Pressure: { currentWeather.main.pressure } hPa</td></tr>
                    <tr><td>Current temperature: { currentWeather.main.temp }%</td></tr>
                    <tr><td>Maximum temperature: { currentWeather.main.temp_max } F°</td></tr>
                    <tr><td>Minimum temperature: { currentWeather.main.temp_min } F°</td></tr>
                  </tbody>
                </Table>

                <Card.Link 
                  href="https://getcityweather.netlify.app" 
                  target="_black"
                >
                  Get more information
                </Card.Link>
              </Container>
            </>
          :  
            <div className="text-center my-5">
              <h3>The zipcode is not valid.</h3>
              <p>Update your zip code going to the "Update" tab.</p>
            </div>
        }
      </Jumbotron>
    </Container>
  ); 
}

export default Weather;
