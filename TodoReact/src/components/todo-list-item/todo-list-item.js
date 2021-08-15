import React, {Component} from 'react';

import './todo-list-item.css';

class TodoListItem extends Component {

  state = {
    done: this.props.done,
    important: this.props.important
  };

  toggleImportant = () => {
    this.setState(state => {
      return {
        important: !state.important
      }
    });
  };

  toggleDone = () => {
    this.setState(state => {
      return {
        done: !state.done
      }
    });
  };


  render() {
    const {label,
       onDeleted,
       important, 
       done,
      onToggleImportant, 
      onToggleDone} = this.props;
    let textClassNames = 'todo-list-item-label';
    let elementClassNames = 'todo-list-item';
    if (important) {
      textClassNames += ' important';
    };
    if (done) {
      textClassNames += ' done';
    };

    return (
      <span className={elementClassNames}>
        <span
          className={textClassNames}
          onClick={onToggleDone}>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }

};

export default TodoListItem;
