module.exports = {
	path: '*/money-transfer',
	getComponent(nextState,callback) {
		require.ensure([],(require) => {
			callback(null,require('./components/MoneyTransfer'))
		})
	}
}