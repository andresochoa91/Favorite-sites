import React, { SFC } from 'react';
import ListSites from './ListSites';
import AddSites from './AddSites';

const Sites: SFC = () => {
  return (
    <>
      <AddSites />
      <ListSites />
    </>
  );
}

export default Sites;