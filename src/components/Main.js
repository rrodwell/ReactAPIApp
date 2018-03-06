import React from 'react';
import { NavbarComponent, } from './subcomponents';

const Main = props => (
  <div id='main-section'>
    <NavbarComponent />
    <main>
      {props.children}
    </main>
  </div>
);

export default Main;