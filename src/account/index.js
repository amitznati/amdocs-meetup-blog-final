import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
// import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import {Container} from '@material-ui/core';
import CreatePost from './CreatePost';
import PostsList from './PostsList';

const AccountHome = () => {
  const { path, url } = useRouteMatch();
  return (
    <Container>
      <h2>My Account</h2>
      <ul>
        <li>
          <Link to={`${url}`}>Account Home</Link>
        </li>
        <li>
          <Link to={`${url}/postslist`}>My Posts</Link>
        </li>
        <li>
          <Link to={`${url}/createpost`}>Create New Post</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          home
        </Route>
        <Route exact path={`${url}/postslist`}>
          <PostsList />
        </Route>
        <Route exact path={`${url}/createpost`}>
          <CreatePost />
        </Route>
      </Switch>
    </Container>
  )
};

export default AccountHome;
