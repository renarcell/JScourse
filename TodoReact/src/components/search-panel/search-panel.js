import React, { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
  render() { 
    const {onChange} = this.props; 
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={(e) => {onChange(e.target.value)}} />
    );
  }
};

export default SearchPanel;
