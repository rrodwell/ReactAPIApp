import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import Main from './../components/Main';
import { Home, TestCases, Defects, Okta } from './../components/pages';
// import { LoginComponent } from '../components/common';

const routes = (
  <Router>
    <Main>
      <Route exact path='/' component={Home} />

      <Route exact path='/test-cases' component={TestCases} />
      {/* <Route path='/test-cases/qtest-login' component={LoginComponent} /> */}
      <Route path='/defects' component={Defects} />
      {/* <Route path='/upload' component={UploadDefects} /> */}
      <Route path='/okta' component={Okta} />

    </Main>
  </Router>
);

export default routes;