module.exports = {
	path: '*/overseas-asset-allocation',
	getComponent(nextState,callback) {
		require.ensure([],(require) => {
			callback(null,require('./components/OverseasAssetAllocation'))
		})
	}
}