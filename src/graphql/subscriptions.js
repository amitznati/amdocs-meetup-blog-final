/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      desc
      content
      image
      username
      createdAt
      updatedAt
      comments {
        nextToken
      }
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      desc
      content
      image
      username
      createdAt
      updatedAt
      comments {
        nextToken
      }
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($username: String) {
    onCreateComment(username: $username) {
      id
      postID
      username
      content
      createdAt
      updatedAt
      post {
        id
        title
        desc
        content
        image
        username
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($username: String) {
    onUpdateComment(username: $username) {
      id
      postID
      username
      content
      createdAt
      updatedAt
      post {
        id
        title
        desc
        content
        image
        username
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($username: String) {
    onDeleteComment(username: $username) {
      id
      postID
      username
      content
      createdAt
      updatedAt
      post {
        id
        title
        desc
        content
        image
        username
        createdAt
        updatedAt
      }
    }
  }
`;
