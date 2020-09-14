import React, { SFC } from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const SignForms: SFC = () => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Jumbotron 
          className="rounded text-center text-white p-5" 
          fluid
          style={{
            backgroundColor: "rgba(0,0,0,0.65)"
          }}
        >
          <Container>
            <h1 className="display-4">Keep track of your favorite websites!</h1>
            <Row>
              <Col>
                <SignIn />
              </Col>
              <Col>
                <SignUp />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    </>
  );
}

export default SignForms;