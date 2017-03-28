module.exports = {
	path: '*/physical-currency-exchange',
	getComponent(nextState,callback) {
		require.ensure([],(require) => {
			callback(null,require('./components/PhysicalCurrencyExchange'))
		})
	}
}