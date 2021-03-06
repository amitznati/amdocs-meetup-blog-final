import React from 'react';
import MainFeaturedPost from './MainFeaturedPost';
import Grid from '@material-ui/core/Grid';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  featurePosts: {
    height: 300
  }
}));

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    {title: 'March 2020', url: '#'},
    {title: 'February 2020', url: '#'},
    {title: 'January 2020', url: '#'},
    {title: 'November 1999', url: '#'},
    {title: 'October 1999', url: '#'},
    {title: 'September 1999', url: '#'},
    {title: 'August 1999', url: '#'},
    {title: 'July 1999', url: '#'},
    {title: 'June 1999', url: '#'},
    {title: 'May 1999', url: '#'},
    {title: 'April 1999', url: '#'},
  ],
  social: [
    {name: 'GitHub', icon: GitHubIcon},
    {name: 'Twitter', icon: TwitterIcon},
    {name: 'Facebook', icon: FacebookIcon},
  ],
};

export default function BlogHome({posts}) {
  const classes = useStyles();
  return (
    <>
      <MainFeaturedPost post={posts[0]}/>
      <Grid container spacing={4}>
        <FeaturedPost post={posts[1]}/>
        <FeaturedPost post={posts[2]}/>
      </Grid>
      <Grid container spacing={5} className={classes.mainGrid}>
        <Main title="From the firehose" posts={posts}/>
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        />
      </Grid>
    </>
  )
}
