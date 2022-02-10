import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: {},
	reducers: {
		renderComments: (state, action) => {
			const { commentId, author, text, time, postId } = action.payload;
			state[commentId] = {
				id: commentId,
				postId: postId,
				author: author,
				text: text,
				time: time
			};
		}
	}
});

export const selectComments = (state) => state.comments;
export const { renderComments } = commentsSlice.actions;
export default commentsSlice.reducer;

/*comments: {
    commentId: {
      commentId: commentId,
      author: author,
      text: text,
      time: time
    }       
  }*/  