import React, {Component} from 'react';
import { render } from 'react-dom';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

class TodoList extends Component {

  state = {

  };

  hideElement = () => {
    this.setState({
      del: true
    })
  };

render() {  
  const {todos,
     onDeleted,
    onToggleImportant, 
    onToggleDone} = this.props;
  let elementClassNames = "list-group-item";

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className={elementClassNames}>
        <TodoListItem {...itemProps }
        onDeleted={() => {onDeleted(id)}}
        onToggleImportant={() => {onToggleImportant(id)}}
        onToggleDone={() => onToggleDone(id)} />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
}
};

export default TodoList;
