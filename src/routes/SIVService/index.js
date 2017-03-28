module.exports = {
	path: '*/siv-service',
	getComponent(nextState,callback) {
		require.ensure([],(require) => {
			callback(null,require('./components/SIVService'))
		})
	}
}