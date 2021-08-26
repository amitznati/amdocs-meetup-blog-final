import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import BlogHome from './BlogHome';
import AccountHome from '../account';

import {posts as postsMocks} from '../account/postsMock';
import PostView from './PostView';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const sections = [
  {title: 'Technology', url: '#'},
  {title: 'Design', url: '#'},
  {title: 'Culture', url: '#'},
  {title: 'Business', url: '#'},
  {title: 'Politics', url: '#'},
  {title: 'Opinion', url: '#'},
  {title: 'Science', url: '#'},
  {title: 'Health', url: '#'},
  {title: 'Style', url: '#'},
  {title: 'Travel', url: '#'},
];


export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.sortByDate(postsMocks)
    }
  }

  sortByDate = array => array.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  render() {
    const {posts} = this.state;
    return (
      <Router>
        <ScrollToTop/>
        <CssBaseline/>
        <Container maxWidth="lg">
          <Header title="Amdocs Meetup Blog" sections={sections}/>
          <main>
            <Switch>
              <Route exact path="/">
                {posts.length > 2 && <BlogHome posts={posts}/>}
              </Route>
              <Route exact path="/posts/:postId">
                <PostView/>
              </Route>
              <Route path="/myaccount">
                <AccountHome/>
              </Route>
            </Switch>
          </main>
        </Container>
        <Footer title="Footer" description="Something here to give the footer a purpose!"/>
      </Router>
    );
  }
}
