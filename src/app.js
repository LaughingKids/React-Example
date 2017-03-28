import React , {Component} from 'react';
import ReactDOM , {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

const rootRouter = {
	childRoutes : [{
		path: '/',
		component: require('./components/app/App'),
		/* add all templates for entire website*/
		childRoutes:[
			/* Customized template pages */
			require('./routes/AboutUs'),
			require('./routes/ContactUs'),
			require('./routes/PhysicalCurrencyExchange'),
			require('./routes/MoneyTransfer'),
			require('./routes/OverseasAssetAllocation'),
			require('./routes/SIVService'),
			require('./routes/CalculatorCurrencyPair'),
			require('./routes/Registeration'),
			/* Virtual composer pages */
			require('./routes/Disclaimer'),
			require('./routes/OurLicense'),
			require('./routes/TermsCondition'),
			require('./routes/PrivacyPolicy'),
			require('./routes/AntiMoneyLaunderingStatement'),
			require('./routes/FAQ'),
			/* All post types */
			// require('./routes/PostSingle'), //single post
			// require('./routes/PostArchive'), // post list page filter by cat id
			require('./routes/MarketWarpNewsArchive'),
			require('./routes/MarketWarpNewsSingle'),
		]
	}]
}
render(
	<Router history = {browserHistory} routes = {rootRouter} />
	,document.getElementById('app'));
