import React from 'react';
import Blog from './blog/Blog';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <React.Fragment>
      <Blog />
    </React.Fragment>
  );
}

export default App;
