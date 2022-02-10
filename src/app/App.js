import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './app.css';
import { trackPromise } from'react-promise-tracker';
import Header from './../features/header/Header.js';
import Posts from './../features/posts/Posts.js';
import Subreddits from './../features/subreddits/Subreddits.js';
import { Reddit } from './../data/reddit.js';
import { renderSubreddits, addPostIdToSubreddit } from './../features/subreddits/subredditsSlice.js';
import { renderPosts } from './../features/posts/postsSlice.js';

export default function App() {
  const dispatch = useDispatch();

  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

  const [showedPost, setShowedPost] = useState('t5_2qs0k');
  const [clickedSubredditName, setClickedSubredditName] = useState('/r/Home/');
  const [search, setSearch] = useState('');

  useEffect(() => {
    trackPromise(
      Reddit.fetchSubreddits().then(subreddits => {
        subreddits.map(subreddit => {
        dispatch(renderSubreddits({
          id: subreddit.name,
          title: subreddit.display_name_prefixed,
          iconImg: subreddit.icon_img,
          url: subreddit.url,
          posts: {}
        }))
      })})
    , 'posts');
    
    Reddit.fetchHomePosts().then(homePosts => {
      homePosts.map(homePost => {
        dispatch(renderPosts({
          id: homePost.name,
          shortPostId: homePost.id,
          subredditId: homePost.subreddit_id,
          title: homePost.title,
          author: homePost.author,
          imgExist: homePost.post_hint === 'image',
          img: homePost.url,
          videoExist: homePost.is_video,
          video: homePost.media === null ? false
            : homePost.media.reddit_video ? homePost.media.reddit_video.fallback_url
            : homePost.media.oembed ? homePost.media.oembed.html
            : false,
          youtubeExist: homePost.domain === 'youtube.com',
          youtube: homePost.media === null ? false
            : homePost.media.oembed ? ('https://www.youtube.com/embed/' + homePost.url.match(regExp)[7])
            : homePost.media.reddit_video ? homePost.media.reddit_video.fallback_url
            : false,
          score: homePost.score,
          time: homePost.created_utc,
          commentsNum: homePost.num_comments
        }));

        dispatch(addPostIdToSubreddit({
          subredditId: homePost.subreddit_id,
          postId: homePost.name
        }));
      })
    })
  }, []);

  return (
    <div className="App">
      <Header 
        search={search}
        setSearch={setSearch}
      />
      <div className='page-container'>
        <Posts 
          showedPost={showedPost}
          clickedSubredditName={clickedSubredditName}
          search={search}
        />
        <Subreddits 
          showedPost={showedPost}
          setShowedPost={setShowedPost}
          setClickedSubredditName={setClickedSubredditName}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
}