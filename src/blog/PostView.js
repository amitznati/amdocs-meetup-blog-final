import React from 'react';
import Markdown from './Markdown';
import {useParams} from "react-router-dom";
import {posts} from '../account/postsMock';

export default function PostView() {
  const { postId } = useParams();
  console.log('post id: ', postId);
  const post = posts.find(p => p.id.toString() === postId);
  return (
    <div>
      <h1>{post.title}</h1>
      <h5>
        <Markdown source={post.desc} />
      </h5>
      <div style={{textAlign: 'center'}}>
        <img src={post.image} style={{maxHeight: 500}} alt={post.title} />
      </div>
      <Markdown source={post.content} />
    </div>
  )
}
