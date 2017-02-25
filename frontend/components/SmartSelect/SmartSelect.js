import './SmartSelect.styl';

import classNames                       from 'classnames';
import React, { Component, PropTypes }  from 'react';
import detectMob 												from './Helpers/detectMobile';
import layoutReplacer 									from './Helpers/layoutReplacer'
import * as domUtils										from './Helpers/domUtils'

export default class SmartSelector extends Component {
	static propTypes = {
		list: PropTypes.array.isRequired,
		name: PropTypes.string.isRequired,
		rules: PropTypes.object.isRequired,
		placeholder: PropTypes.string.isRequired,
		style: PropTypes.object
	};

	static DROP_DIRECTION = {
		NONE: 1,
		UP: 2,
		DOWN: 3
	};

	// Maybe move to some utils
	static sortByAlpha(array, value) {
		array = array.slice();

		array.sort((a, b) => {
			let a_value = a[value].trim();
			let b_value = b[value].trim();

			return a_value.localeCompare(b_value);
		});

		return array;
	}

	// Maybe move to some utils
	static includesWord(array, word, value) {
		word = word.toLowerCase();

		array = array.filter(i => {
			return i[value].toLowerCase().includes(word);
		});

		array = array.map(i => {
			let newItem   = Object.assign({}, i);
			let string    = newItem[value];
			let startWord = string.toLowerCase().indexOf(word);
			let endWord   = startWord + word.length;

			let startString  = string.slice(0, startWord);
			let middleString = string.slice(startWord, endWord);
			let endString    = string.slice(endWord, string.length);

			newItem[value] = <span>{startString}<span className="highlight">{middleString}</span>{endString}</span>;

			return newItem;
		});

		return array;
	}

	//region Lifecycle

	constructor(props) {
		super(props);

		let { list, name, rules, style } = props;

		list = SmartSelector.sortByAlpha(list, rules['value']);

		this.state = {
			list,
			name,
			rules,
			style,
			isFocused: false,
			isMobile: true,
			dropDirection: SmartSelector.DROP_DIRECTION.NONE,
			selectedKey: 'default',
			searchValue: ''
		};

		this.resultContainerClick = this.resultContainerClick.bind(this);
		this.searchContainerClick = this.searchContainerClick.bind(this);
		this.searchCountryChange  = this.searchCountryChange.bind(this);
		this.nativeSelectChange   = this.nativeSelectChange.bind(this);
		this.windowResize         = this.windowResize.bind(this);
		this.windowClick          = this.windowClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let { list, name, rules, style } = nextProps;

		list = SmartSelector.sortByAlpha(list, rules['value']);

		this.setState({
			list,
			name,
			rules,
			style
		});
	}

	componentDidMount() {
		let isMobile = detectMob();

		this.setState({
			isMobile
		});

		window.addEventListener('click', this.windowClick);

		window.addEventListener('resize', this.windowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.windowClick);

		window.removeEventListener('resize', this.windowResize);
	}

	componentDidUpdate() {
		let { isFocused, dropDirection } = this.state;
		let resultContainer              = this.refs['result-container'];

		if (isFocused && dropDirection === SmartSelector.DROP_DIRECTION.NONE) {

			let {
						isBottomBordersTouch
					} = domUtils.touchHelper(resultContainer);

			if (isBottomBordersTouch) {
				this.setState({
					dropDirection: SmartSelector.DROP_DIRECTION.UP
				});
			} else {
				this.setState({
					dropDirection: SmartSelector.DROP_DIRECTION.DOWN
				});
			}
		}

		if (!isFocused && dropDirection !== SmartSelector.DROP_DIRECTION.NONE) {
			this.setState({
				dropDirection: SmartSelector.DROP_DIRECTION.NONE
			});
		}
	}

	render() {
		let { isMobile, isFocused, dropDirection, style } = this.state;
		let classes                                       = classNames(
			'smart-selector',
			{ 'smart-selector--mobile': isMobile },
			{ 'smart-selector--focus': isFocused },
			{ 'smart-selector--up': dropDirection === SmartSelector.DROP_DIRECTION.UP },
			{ 'smart-selector--down': dropDirection === SmartSelector.DROP_DIRECTION.DOWN }
		);

		return (
			<div className={classes} style={style}>
				{ this.renderNativeSelect() }
				{ this.renderCustomSelect() }
			</div>
		);
	}

	//endregion

	//region Renders

	renderCustomSelect() {
		let { list, rules: { key, value }, selectedKey, searchValue } = this.state;
		let { placeholder }                                           = this.props;

		if (selectedKey !== 'default') {
			let item = list.find(i => i[key] === selectedKey);

			if (item && item[value]) {
				placeholder = item[value];
			}
		}

		if (searchValue !== '') {
			list = SmartSelector.includesWord(list, searchValue, value);
		}

		return (
			<div className="smart-selector_custom">
				<div className="search-container" onClick={ this.searchContainerClick }>
					<input ref="search-country"
								 id="search-country"
								 type="text"
								 value={ searchValue }
								 onChange={ this.searchCountryChange }
					/>
					<label htmlFor="search-country">{ placeholder }</label>
				</div>
				<div className="result-container" ref="result-container" onClick={ this.resultContainerClick }>
					{
						list.length > 0
							? list.map(i => {
							return (
								<div className="result-container_item" key={ i[key] } data-value={ i[key] }>
									{ i[value] }
								</div>
							);
						})
							: <div className="result-container_item">
							<span className="highlight">Ничего не найдено</span>
						</div>
					}
				</div>
			</div>
		);
	}

	renderNativeSelect() {
		let { list, name, rules: { key, value }, selectedKey } = this.state;
		let { placeholder }                                    = this.props;

		return (
			<div className="smart-selector_native">
				<select name={name} value={selectedKey} onChange={ this.nativeSelectChange }>
					<option value="default" disabled>{ placeholder }</option>
					{
						list.map(i => {
							return (
								<option key={i[key]} value={i[key]}>
									{i[value]}
								</option>
							);
						})
					}
				</select>
			</div>
		);
	}

	//endregion

	//region Event Handlers

	windowClick(event) {
		this.setState({
			isFocused: false,
			searchValue: ''
		});
	}

	windowResize(event) {
		this.setState({
			dropDirection: SmartSelector.DROP_DIRECTION.NONE
		});
	}

	searchContainerClick(event) {
		event.stopPropagation();
		let { target } = event;
		if (target.tagName === 'LABEL') return;

		let searchCountry = this.refs['search-country'];
		let { isFocused } = this.state;

		if (!isFocused) {
			if (searchCountry) searchCountry.focus();
			this.setState({ isFocused: true });
		} else {
			if (searchCountry) searchCountry.blur();
			this.setState({
				isFocused: false,
				searchValue: ''
			});
		}
	}

	resultContainerClick(event) {
		event.stopPropagation();

		let closest   = domUtils.closest(event.target, '.result-container_item');
		let { value } = closest.dataset;

		this.setState({
			isFocused: false,
			selectedKey: value,
			searchValue: ''
		});
	}

	searchCountryChange(event) {
		event.stopPropagation();
		let { value } = event.target;

		// Maybe add some configurations for layouts
		value = layoutReplacer(value);

		this.setState({
			searchValue: value
		});
	}

	nativeSelectChange(event) {
		event.stopPropagation();
		let { value } = event.target;

		this.setState({
			isFocused: false,
			selectedKey: value,
			searchValue: ''
		});
	}

	//endregion
};