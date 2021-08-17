import React from 'react';
import MDEditor from '@uiw/react-md-editor';


export default function Markdown(props) {
  return <MDEditor.Markdown source={props.source} />
}
