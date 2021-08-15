import React, { Component } from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends Component {

  state = {
    filterState : 'all'
  }
  

  changeClass(state) {
    const classActive = "btn btn-info",
    classPasive = "btn btn-outline-secondary";
    return (this.state.filterState === state ? classActive : classPasive);
  }

  setFilterState = state => {
    this.setState({
      filterState: state
    });
  }

  render() {
    const {setFilter} = this.props,
          classActive = "btn btn-info",
          classPasive = "btn btn-outline-secondary";

    return (
      <div className="btn-group">
        <button type="button"
                className={this.changeClass('all')}
                onClick={() => {setFilter('all'),this.setFilterState('all')}}>
                  All</button>
        <button type="button"
                className={this.changeClass('active')}
                onClick={() => {setFilter('active'),this.setFilterState('active')}}>Active</button>
        <button type="button"
                className={this.changeClass('done')}
                onClick={() => {setFilter('done'),this.setFilterState('done')}}>Done</button>
      </div>
    );
  }
};

export default ItemStatusFilter;
