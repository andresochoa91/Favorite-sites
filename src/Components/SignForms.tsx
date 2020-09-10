import React, { SFC } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const SignForms: SFC = () => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Jumbotron className="text-center p-5" fluid>
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