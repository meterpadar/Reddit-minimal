export const Reddit = {
	fetchSubreddits() {
		const subreddits = [];

		return fetch('https://www.reddit.com/subreddits.json')
			.then(response => {
				return response.json();
			})
			.then(jsonResponse => {
				const subredditsLength = jsonResponse.data.children;

				for (let i = 0; i < subredditsLength.length; i++) {
					subreddits.push(jsonResponse.data.children[i].data);
				};
				return subreddits;
			})
			.catch(err => {
				console.log(err);
			});
	},

	fetchHomePosts() {
		const posts = [];

		return fetch(`https://www.reddit.com/r/Home.json`)
			.then(response => {
					return response.json();
				})
			.then(jsonResponse => {
				const postsLength = jsonResponse.data.children;

				for (let i = 0; i < postsLength.length; i++) {
					posts.push(jsonResponse.data.children[i].data);
				};
				return posts;
			})
			.catch(err => {
				console.log(err);
			});
	}
}