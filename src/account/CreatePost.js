import React from "react";
import MDEditor from '@uiw/react-md-editor';
import {Grid, TextField, InputLabel, Button, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { API, Storage,  } from 'aws-amplify';
import { createPost } from '../graphql/mutations';

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      content: '**Hello world!!!**',
      imageInput: null
    }
    this.imageRef = React.createRef();
  }

  onImageChange = ({target: {validity, files: [imageInput]}}) =>
    validity.valid && this.setState({imageInput});
  onImageRemove = () => {
    this.imageRef.current.value = '';
    this.setState({imageInput: null});
  };

  onSubmit = () => {
    const {imageInput, ...newPost} = this.state;
    if (!(newPost.title && newPost.desc && newPost.content && imageInput)) return;
    const image = imageInput;
    function getImageName() {
      const fileNameArr = image.name.split('.');
      const imageFileExt = fileNameArr.pop();
      return `${fileNameArr.join('.').replace(' ', '_')}_${Date.now()}.${imageFileExt}`;
    }

    const imageFileName = getImageName();
    newPost.image = `https://d1xcntdnjjxto4.cloudfront.net/${imageFileName}`;

    Storage.put(
      imageFileName,
      image,
      {contentType: image.type})
      .then(storageRes => {
        console.log(storageRes);
        API.graphql({
          query: createPost,
          variables: {input: newPost},
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        }).then(() => {
          this.imageRef.current.value = '';
          this.setState({title: '', desc: '', content: '', imageInput: null});
        });
      });
  }
  render() {
    const {title, desc, content, imageInput} = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Create New Post</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={title}
            label="Title"
            placeholder="Post Title"
            onChange={({target: {value: title}}) => this.setState({title})}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              ref={this.imageRef}
              hidden
              accept="image/*"
              onChange={this.onImageChange}
            />
          </Button>
          {imageInput && <div>
            <img src={URL.createObjectURL(imageInput)} height={200} alt="upload"/>
            <IconButton aria-label="delete" onClick={this.onImageRemove}>
              <DeleteIcon fontSize="large"/>
            </IconButton>
          </div>}
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Description</InputLabel>
        </Grid>
        <Grid item xs={12}>
          <MDEditor
            value={desc}
            onChange={desc => this.setState({desc})}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Content</InputLabel>
        </Grid>
        <Grid item xs={12}>
          <MDEditor
            value={content}
            onChange={content => this.setState({content})}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={this.onSubmit} variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    );
  }
}
