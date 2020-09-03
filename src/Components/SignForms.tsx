import React, {SFC} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const SignForms: SFC = () => {
  return (
    <>
      <SignIn />
      <SignUp />
      <ForgotPassword />
    </>
  );
}

export default SignForms;