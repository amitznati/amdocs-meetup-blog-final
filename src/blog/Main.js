import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import Markdown from './Markdown';
import {Card} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  marginB: {
    marginBottom: theme.spacing(2)
  },
  card: {
    margin: '2rem 0',
    padding: '20px'
  },
  image: {
    maxWidth: '500px',
    maxHeight: '500px',
    margin: 'auto',
    display: 'block',
    [theme.breakpoints.down("xs")]: {
      maxWidth: '100%',
    },
    [theme.breakpoints.between("sm", "md")]: {
      maxWidth: '500px',
    },
    "@media (min-width: 1280px)": {
      maxWidth: '500px',
    }
  },
  postHeader: {
    // display: 'flex',
    // justifyContent: 'space-between'
    // maxHeight: '300px',
    // maxWidth: '300px'
  },
  postHeaderText: {

  }
}));

export default function Main(props) {
  const classes = useStyles();
  const {posts, title} = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider className={classes.marginB}/>
      {posts.map((post) => (
        <Card key={post.id} className={classes.card}>
          <div className={classes.postHeader}>
            <div>
              <Typography component={RouterLink} to={`posts/${post.id}`} variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <Markdown>{post.description}</Markdown>
              </Typography>
            </div>
            <img src={post.image} className={classes.image} alt={post.title} />
          </div>
          <div className={classes.markdown}>
            <Markdown>{post.content}</Markdown>
          </div>
        </Card>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
