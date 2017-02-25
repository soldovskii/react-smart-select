import './CountryListApp.styl';
import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import * as CountryListActions  from '../actions/CountryListActions';
import SmartSelector            from '../components/SmartSelector';

@connect(state => state)
export default class CountryListApp extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		const actions      = bindActionCreators(CountryListActions, dispatch);

		actions.getList();
	}

	render() {
		let { countryList } = this.props;

		return (
			<div className="country-list-app">
				<SmartSelector
					list={countryList}
					rules={{ 'key': 'iso', 'value': 'name' }}
					name="city-selector"
					placeholder="Выберите страну"
					style={{ width: '350px' }}
				/>

				<SmartSelector
					list={countryList}
					rules={{ 'key': 'iso', 'value': 'name' }}
					name="city-selector"
					placeholder="Выберите страну"
					style={{ top: '350px', width: '350px' }}
				/>

			</div>
		);
	}
};