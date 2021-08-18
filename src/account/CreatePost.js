import React from "react";
import MDEditor from '@uiw/react-md-editor';
import {Grid, TextField, InputLabel, Button, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { API, Storage } from 'aws-amplify';
import { createPost, updatePost } from '../graphql/mutations';

export default function CreatePost() {
  const imageRef = React.createRef();
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [content, setContent] = React.useState("**Hello world!!!**");
  const [imageInput, setImageInput] = React.useState('');

  const onImageChange = ({target: {validity, files: [file]}}) =>
    validity.valid && setImageInput(file);
  const onImageRemove = () => {
    imageRef.current.value = '';
    setImageInput('');
  };
  const onSubmit = () => {
    const newPost = {title, desc, content};
    console.log(newPost);
    const image = imageInput;
    if (!(title && desc && content && imageInput)) return;
    API.graphql({
      query: createPost,
      variables: {input: newPost},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }).then(res => {
      const postId = res.data.createPost.id;
      // uploading the image to S3 Bucket
      Storage.put(
        `${postId}.${image.name.split('.').pop()}`,
        image,
        {contentType: image.type})
        .then(storageRes => {
          // updating postImage field with the S3 object key
          API.graphql({
            query: updatePost,
            variables: {input: {id: postId, image: `https://d1xcntdnjjxto4.cloudfront.net/${storageRes.key}`}},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
          }).then(updatedPost => {
            // setValues({content: "**Hello world!!!**", desc: ''});
            onImageRemove();
          });
        });
    });
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3>Create New Post</h3>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Title" placeholder="Post Title" onChange={e => setTitle(e.target.value)}/>
        <Button variant="contained" component="label">
          Upload Image
          <input
            type="file"
            ref={imageRef}
            hidden
            accept="image/*"
            onChange={onImageChange}
          />
        </Button>
        {imageInput && <div>
          <img src={URL.createObjectURL(imageInput)} height={200} alt="upload"/>
          <IconButton aria-label="delete" onClick={onImageRemove}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </div>}
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Description</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <MDEditor
          value={desc}
          onChange={setDesc}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Content</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <MDEditor
          value={content}
          onChange={setContent}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={onSubmit} variant="contained" color="primary">Submit</Button>
      </Grid>
    </Grid>
  );
}
