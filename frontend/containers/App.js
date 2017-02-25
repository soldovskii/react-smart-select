import React, { Component }     from 'react';
import { createStore }  				from 'redux';
import { Provider }             from 'react-redux';

import CountryListReducer       from '../reducers/CountryListReducer';
import CountryListApp            from './CountryListApp';

const store = createStore(
	CountryListReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class App extends Component {
	render() {
		return (
			<div id="root">
				<Provider store={store}>
					<CountryListApp/>
				</Provider>
			</div>
		);
	}
};
