import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import {Container} from '@material-ui/core';
import CreatePost from './CreatePost';

const AccountHome = () => {
  const { path, url } = useRouteMatch();
  return (
    <Container>
      <h2>My Account</h2>
      <ul>
        <li>
          <Link to={`${url}/postslist`}>postslist</Link>
        </li>
        <li>
          <Link to={`${url}/createpost`}>createpost</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          home
        </Route>
        <Route exact path={`${url}/postslist`}>
          Posts List
        </Route>
        <Route exact path={`${url}/createpost`}>
          <CreatePost />
        </Route>
      </Switch>
    </Container>
  )
};

export default AccountHome;
