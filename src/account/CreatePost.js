import React from "react";
import MDEditor from '@uiw/react-md-editor';
import {Grid, TextField, InputLabel, Button, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
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
    const {title, description, content, imageInput} = this.state;
    if (!(title && description && content && imageInput)) return;
    console.log('saving post: ', {title, description, content, imageInput});
  }
  render() {
    const {title, description, content, imageInput} = this.state;
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
            value={description}
            onChange={description => this.setState({description})}
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
