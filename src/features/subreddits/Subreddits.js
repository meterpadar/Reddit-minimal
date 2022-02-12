import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { trackPromise } from'react-promise-tracker';
import { selectSubreddits, addPostIdToSubreddit } from './subredditsSlice.js';
import { renderPosts, selectPosts } from './../posts/postsSlice.js';

export default function Subreddits({showedPost, setShowedPost, setClickedSubredditName, setSearch}) {
  const subreddits = useSelector(selectSubreddits);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

  const changeSubreddit = (event) => {
    event.preventDefault();

    let subredditUrl = 'r/Home';
    const postsArr = [];
    let currentSubredditIdClick = event.currentTarget.getAttribute('data-key');
    let postsIds = Object.values(posts).map(post => post.id);

    setShowedPost(event.currentTarget.getAttribute('data-key'))

    setClickedSubredditName(event.currentTarget.getAttribute('href'));

    setSearch('');

    subredditUrl = event.currentTarget.children[1].textContent;

    if (currentSubredditIdClick !== showedPost) {
      for (let i = 0; i < postsIds.length; i++) {
        document.getElementById(postsIds[i]).style.display = 'none';
      };
    }    

    if (subreddits[currentSubredditIdClick].posts.length !== 0) return;

    trackPromise(fetch(`https://www.reddit.com/${subredditUrl}.json`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        const postsLength = jsonResponse.data.children;
        for (let i = 0; i < postsLength.length; i++) {
          postsArr.push(jsonResponse.data.children[i].data);

          dispatch(renderPosts({
            id: postsArr[i].name,
            shortPostId: postsArr[i].id,
            subredditId: postsArr[i].subreddit_id,
            title: postsArr[i].title,
            author: postsArr[i].author,
            img: postsArr[i].url,
            imgExist: postsArr[i].post_hint === 'image',
            videoExist: postsArr[i].is_video,
            video: postsArr[i].media === null ? false
              : postsArr[i].media.reddit_video ? postsArr[i].media.reddit_video.fallback_url
              : false,
            youtubeExist: postsArr[i].domain === 'youtube.com',
            youtube: postsArr[i].media === null ? false
              : postsArr[i].domain === 'youtube.com' ? ('https://www.youtube.com/embed/' + postsArr[i].url.match(regExp)[7])
              : false,
            score: postsArr[i].score,
            time: postsArr[i].created_utc,
            commentsNum: postsArr[i].num_comments
          }));
  
          if (subreddits[postsArr[i].subreddit_id].posts.includes(postsArr[i].name)) {
            return;  
          };

          dispatch(addPostIdToSubreddit({
            subredditId: postsArr[i].subreddit_id,
            postId: postsArr[i].name
          })); 
        };
        return postsArr;
      })
      .catch(err => {
        console.log(err);
      })
    , 'posts');
  };

  return (
    <div className="subreddits">
      <h1>Subreddits</h1>
      {Object.values(subreddits).map((subreddit) => (
        <a
          onClick={changeSubreddit} 
          href={subreddit.url} 
          className='subreddits-container' 
          key={subreddit.id}
          data-key={subreddit.id}
        >
          <img 
            src={!subreddit.iconImg ? 'logo192.png' : subreddit.iconImg} 
            alt={subreddit.title}/
          >
          <h2>{subreddit.title}</h2>         
        </a>
        ))}
    </div>
  );
}
