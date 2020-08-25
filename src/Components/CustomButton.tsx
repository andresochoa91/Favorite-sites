import React from 'react';

const CustomButton: React.SFC<React.ReactNode & any> = ({ children, ...otherProps }) => {
  return (
    <button { ...otherProps }>{ children }</button>
  );
}

export default CustomButton;