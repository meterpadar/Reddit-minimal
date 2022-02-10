import { createSlice } from '@reduxjs/toolkit';

export const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState: {},
	reducers: {
		renderSubreddits: (state, action) => {
			const { id, title, iconImg, url } = action.payload;
			state[id] = {
				id: id,
				title: title,
				iconImg: iconImg,
				url: url,
				posts: []
			}
		},

		addPostIdToSubreddit: (state, action) => {
			const subredditId = action.payload.subredditId;
			const postId = action.payload.postId;
			state[subredditId].posts.push(postId);
		}
	}
});

export const selectSubreddits = (state) => state.subreddits;
export const { renderSubreddits, addPostIdToSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;