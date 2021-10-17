import React, {useEffect, useState} from 'react';
import Markdown from './Markdown';
import {useParams} from "react-router-dom";
import {posts} from '../account/postsMock';

export default function PostView() {
  const { postId } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    setPost(posts.find(p => p.id.toString() === postId))
  },[postId]);
  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <h1>{post.title}</h1>
      <h5>
        <Markdown>{post.desc}</Markdown>
      </h5>
      <div style={{textAlign: 'center'}}>
        <img src={post.image} style={{maxHeight: 500, maxWidth: '100%'}} alt={post.title} />
      </div>
      <Markdown>{post.content}</Markdown>
    </div>
  )
}
