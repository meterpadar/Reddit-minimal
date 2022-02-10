import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
	name: 'posts',
	initialState: {},
	reducers: {
		renderPosts: (state, action) => {
			const { id, shortPostId, subredditId, title, author, img, video, youtube, score, time, commentsNum, imgExist, videoExist, youtubeExist } = action.payload;
			state[id] = {
				id: id,
				shortPostId: shortPostId,
				subredditId: subredditId,
				title: title,
				author: author,
				img: imgExist ? img : false,
				video: videoExist ? video : false,
				youtube: youtubeExist ? youtube : false,
				score: score,
				time: time,
				commentsNum: commentsNum,
				comments: []
			}
		},

		addCommentIdToPost: (state, action) => {
			const postId = action.payload.postId;
			const commentId = action.payload.commentId;
			state[postId].comments.push(commentId);
		}
	}
});

export const selectPosts = (state) => state.posts;
export const { renderPosts, addCommentIdToPost } = postsSlice.actions;
export default postsSlice.reducer;