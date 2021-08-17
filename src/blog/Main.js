import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  marginB: {
    marginBottom: theme.spacing(2)
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
        <div key={post.id}>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <div className={classes.markdown}>
            <Markdown source={post.content} />
          </div>
        </div>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
