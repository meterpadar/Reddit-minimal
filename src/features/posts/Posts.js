import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from'react-promise-tracker';
import Comments from './Comments.js';
import { selectPosts, addCommentIdToPost } from './postsSlice.js';
import { selectSubreddits } from './../subreddits/subredditsSlice.js';
import { renderComments } from './commentsSlice.js';
import { LoadingIndicator } from './../../index.js';

export default function Posts({showedPost, clickedSubredditName, search}) {
  const posts = useSelector(selectPosts);
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();

  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  };

  const showComments = (event) => {
    event.preventDefault();

    const commentsArr = [];
    let clickedPostId = event.currentTarget.getAttribute('post-id');
    let clickedShortPostId = event.currentTarget.getAttribute('short-post-id');
    let toggleComments = document.getElementById(clickedPostId);

    toggleComments.style.display === 'none' ? toggleComments.style.display = 'block' : toggleComments.style.display = 'none';

    if (posts[clickedPostId].comments.length !== 0) return;

    trackPromise(fetch(`https://www.reddit.com${clickedSubredditName}comments/${clickedShortPostId}.json`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        const commentsLength = jsonResponse[1].data.children.length;
        for(let i = 0; i < commentsLength; i++) {
          commentsArr.push(jsonResponse[1].data.children[i].data);

          dispatch(renderComments({
            commentId: commentsArr[i].name,
            postId: commentsArr[i].parent_id,
            author: commentsArr[i].author,
            text: commentsArr[i].body,
            time: commentsArr[i].created_utc
          }));

          if (posts[commentsArr[i].parent_id].comments.includes(commentsArr[i].name)) {
            return;  
          };

          dispatch(addCommentIdToPost({
            postId: commentsArr[i].parent_id,
            commentId: commentsArr[i].name
          }));
        };
      })
      .catch(err => {
        console.log(err);
      })
    , `comments_${clickedPostId}`);
  };

  return (
    <div className='posts'>
      <LoadingIndicator  area='posts' />
      {Object.values(posts).map((post) => (
        <div className='post' key={post.id} style={post.subredditId !== showedPost || !post.title.includes(search) ? {display: 'none'} : {display: 'block'}}> 
          <div className='main-post'>
            <div className='arrows'>
              <a href='#'><i className="fas fa-arrow-alt-circle-up fa-lg"></i></a>
              <span>{kFormatter(post.score)}</span>
              <a href='#'><i className="fas fa-arrow-alt-circle-down fa-lg"></i></a>
            </div>
            <div className='post-container'>
              <div>
                <p>
                  {post.title}
                </p>
                {
                  post.img ? <img src={post.img} alt={post.title}/> : null
                }
                {
                  post.video ?
                  <video controls width="100%">
                    <source src={post.video} type="video/mp4"/>
                  </video> : null
                }
                {
                  post.youtube ?
                  <iframe width="100%" height="315" src={post.youtube} frameborder="0" allowfullscreen>
                  </iframe> : null
                }
              </div>
              <div className='post-info'>
                <span className='author'>{post.author}</span>
                {
                  Math.floor((new Date() - new Date(post.time * 1000)) / 60000) < 60 ?
                  <span className='time-ago'>{Math.floor((new Date() - new Date(post.time * 1000)) / 60000)} minutes ago</span>
                  : Math.floor((new Date() - new Date(post.time * 1000)) / 60000) >= 60 && Math.floor((new Date() - new Date(post.time * 1000)) / 60000) < 1440 ? <span className='time-ago'>{Math.floor(((new Date() - new Date(post.time * 1000)) / 60000) / 60)} hours ago</span>
                    : <span className='time-ago'>{Math.ceil((((new Date() - new Date(post.time * 1000)) / 60000) / 60) / 24)} days ago</span>
                  }
                <span>
                  <a 
                    href='#'
                    short-post-id={post.shortPostId}
                    post-id={post.id}
                    onClick={showComments}
                  >
                    <i className="far fa-comment fa-lg"></i>
                  </a>
                  <span className='num-comments'>{post.commentsNum}</span>
                </span>
              </div>
            </div>
          </div>
          <Comments
            postId={post.id}
          />
        </div>
      ))}     
    </div>
  );
}