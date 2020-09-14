import React, { SFC } from 'react';
import ListSites from './ListSites/ListSites';
import AddSites from './AddSites/AddSites';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const Sites: SFC = () => {
  return (
    <Container>
      <Jumbotron 
        className="mt-5 text-white"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)"
        }}
      >
        <AddSites />
        <ListSites />
      </Jumbotron>
    </Container>
  );
}

export default Sites;