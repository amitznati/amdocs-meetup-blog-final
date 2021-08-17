import React from "react";
import MDEditor from '@uiw/react-md-editor';
import {Grid, TextField, InputLabel, Button, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CreatePost() {
  const imageRef = React.createRef();
  const [values, setValues] = React.useState({content: "**Hello world!!!**", desc: '', image: ''});
  const onImageChange = ({target: {validity, files: [file]}}) =>
    validity.valid && setValues({...values, image: file});
  const onImageRemove = () => {
    imageRef.current.value = '';
    setValues({...values, image: ''});
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3>Create New Post</h3>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Title" placeholder="Post Title" onChange={e => setValues({...values, title: e.target.value})}/>
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
        {values.image && <div>
          <img src={URL.createObjectURL(values.image)} height={200} alt="uploaded image"/>
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
          value={values.desc}
          onChange={desc => setValues({...values, desc})}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Content</InputLabel>
      </Grid>
      <Grid item xs={12}>
        <MDEditor
          value={values.content}
          onChange={content => setValues({...values, content})}
        />
      </Grid>
    </Grid>
  );
}
