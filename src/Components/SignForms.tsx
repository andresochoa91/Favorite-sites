import React, {SFC} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignForms: SFC = () => {
  return (
    <>
      <h1 className="display-4">Keep track of your favorite websites!</h1>
      <Row>
        <Col>
          <SignIn />
        </Col>
        <Col>
          <SignUp />
        </Col>
      </Row>
    </>
  );
}

export default SignForms;