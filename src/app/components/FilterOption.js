import React, { Component } from 'react';
import potInactive from '../assets/images/lastmonth_1.png';
import vaseInactive from '../assets/images/6month_1.png';
import cactusInactive from '../assets/images/alltime_1.png';
import { Link } from 'react-router-dom';

const renderIcon = (value) => {
  switch (value) {
    case 'short_term':
      return potInactive
    case 'medium_term':
      return vaseInactive
    case 'long_term':
      return cactusInactive
    default:
      null
  }
}

export default class FilterOption extends Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { value, clickHandler } = this.props;

    clickHandler(value);
  }

  render() {
    const { children, value } = this.props;

    return (
      <div className='option'>
        <div className='icon'>
          <img src={renderIcon(value)} />
        </div>

        <div>
          <Link 
            className='btn' 
            to={`?time-range=${value}`}
            onClick={this.handleClick}
          >
            { children }
          </Link>
        </div>
      </div>
    )
  }
}