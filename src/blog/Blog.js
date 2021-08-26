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


export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    API.graphql(graphqlOperation(listPosts))
      .then(postRes => this.setState({posts: this.sortByDate(postRes.data.listPosts.items)}));
    this.subscription = API.graphql(
      graphqlOperation(onCreatePost)
    ).subscribe({
      next: ({value: {data: {onCreatePost: newPost}}}) => {
        console.log(newPost);
        this.setState(s => ({posts: [newPost, ...s.posts]}));
      },
      error: error => console.warn(error)
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
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
