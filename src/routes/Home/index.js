/**
 * Example route is hostname/{language_slug}/page/:pageName
 * This route is for all wordrpess pages.
 * we also can use pageId as the identifier when we request
 * page content from backend server, but for making url more
 * SEO friendly a more readable url is recommended.
 */

module.exports = {
	path: '/',
	getComponent(nextState,callback) {
		require.ensure([],(require) => {
			callback(null,require('./components/Home'))
		})
	}
}