import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';

export default class Combobox extends Component {
  getInitialState () {
    return {
      opened: false
    };
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  optionClicked ( value, event ) {
    event.preventDefault();

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({
      opened: false
    });
  }

  renderOption (option, i) {
    return (
      <div
        key={i}
        className='combobox-option'
        onClick={this.optionClicked.bind(this, this.props.values[i])}>
        {option}
      </div>
    );
  }

  render () {
    var className = 'combobox-holder' + (this.state.opened ? ' opened' : '');

    var label = '';
    forEach(this.props.values, (value, key) => {
      if (this.props.value === value) {
        label = this.props.labels[key];
      }
    });

    return (
      <div className='combobox'>
        <div className={className}>
          <div className='combobox-header' onClick={this.toggle.bind(this)}>
            <div className='selected-text'>{label}</div>
            <div className='combobox-button'>
              <i className={this.state.opened ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
            </div>
          </div>
          <div className='combobox-options-holder'>
            {this.props.labels.map(this.renderOption, this)}
          </div>
        </div>
      </div>
    );
  }
}

Combobox.propTypes = {
  labels: React.PropTypes.array.isRequired,
  values: React.PropTypes.array.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};