import React from 'react';
import { selectComments } from './commentsSlice.js';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from './../../index.js';

export default function Comment({postId}) {
  const comments = useSelector(selectComments);

  return (
    <div id={postId} className='comments' style={{display: 'none'}}>
      <LoadingIndicator area={`comments_${postId}`} />
      {Object.values(comments).map((comment) => (
        <div className='comment' key={comment.id} style={comment.postId !== postId ? {display: 'none'} : {display: 'block'}}>
          <div className='commnet-container'>  
            <h1>{comment.author}</h1>
            <span>
              {
                Math.floor((new Date() - new Date(comment.time * 1000)) / 60000) < 60 ?
                <span className='time-ago'>{Math.floor((new Date() - new Date(comment.time * 1000)) / 60000)} minutes ago</span>
                : Math.floor((new Date() - new Date(comment.time * 1000)) / 60000) >= 60 && Math.floor((new Date() - new Date(comment.time * 1000)) / 60000) < 1440 ? <span className='time-ago'>{Math.floor(((new Date() - new Date(comment.time * 1000)) / 60000) / 60)} hours ago</span>
                  : <span className='time-ago'>{Math.ceil((((new Date() - new Date(comment.time * 1000)) / 60000) / 60) / 24)} days ago</span>
                }
            </span>
          </div>
            <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}