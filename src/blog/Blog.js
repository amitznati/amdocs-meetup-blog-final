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
import PostView from './PostView';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';
import {onCreatePost} from '../graphql/subscriptions'

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


export default function Blog() {
  const [posts, setPosts] = React.useState([]);
  const sortByDate = arr => arr.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
  useEffect(() => {
      API.graphql(graphqlOperation(listPosts)).then(({data: {listPosts: {items}}}) => {
        setPosts(sortByDate(items));
      });
  }, []);
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreatePost))
      .subscribe({
        next: ({value}) => {
          console.log('subs callback: ', value.data.onCreatePost);
          setPosts([value.data.onCreatePost, ...posts]);
        },
        error(errorValue) {
          console.log('subs error: ', errorValue);
        }
      });
    return () => subscription.unsubscribe();
  }, [posts]);

  return (
    <Router>
      <ScrollToTop/>
      <CssBaseline/>
      <Container maxWidth="lg" style={{overflow: 'hidden'}}>
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
